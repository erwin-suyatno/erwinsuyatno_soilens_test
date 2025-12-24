<script setup lang="ts">
/**
 * Table Management Page
 * Full CRUD operations for restaurant tables
 */

import { ref, onMounted, computed } from 'vue'
import { useTableStore } from '@/store/table.store'
import { useOrderStore } from '@/store/order.store'
import { useAuthStore } from '@/store/auth.store'
import { useToast } from '@/composables/useToast'
import type { Table } from '@/types/order'
import QRCode from 'qrcode'
import jsPDF from 'jspdf'

const tableStore = useTableStore()
const orderStore = useOrderStore()
const authStore = useAuthStore()
const { showToast } = useToast()

const loading = ref(true)
const showModal = ref(false)
const showDeleteDialog = ref(false)
const showQRModal = ref(false)
const viewingTable = ref<Table | null>(null)
const qrCodeDataUrl = ref<string>('')
const editingTable = ref<Table | null>(null)
const deletingTable = ref<Table | null>(null)

// Form data
const formData = ref({
  table_number: '',
  is_active: true,
})

// Computed
const isEditMode = computed(() => !!editingTable.value)
const modalTitle = computed(() => (isEditMode.value ? 'Edit Table' : 'Add New Table'))

// Fetch all tables with pagination
const fetchTables = async () => {
  loading.value = true
  try {
    const restaurantId = authStore.user?.restaurant_id
    if (!restaurantId) {
      throw new Error('Restaurant ID not found. Please login again.')
    }
    await tableStore.fetchTables(restaurantId)
    await tableStore.fetchAvailableTables(restaurantId)
  } catch (error: any) {
    showToast(error.message || 'Failed to load tables', 'error')
    console.error('Table fetch error:', error)
  } finally {
    loading.value = false
  }
}

// Open add modal
const openAddModal = () => {
  editingTable.value = null
  formData.value = {
    table_number: '',
    is_active: true,
  }
  showModal.value = true
}

// Open edit modal
const openEditModal = (table: Table) => {
  editingTable.value = table
  formData.value = {
    table_number: table.table_number,
    is_active: table.is_active,
  }
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
  editingTable.value = null
  formData.value = {
    table_number: '',
    is_active: true,
  }
}

// Save table (create or update)
const saveTable = async () => {
  try {
    if (!formData.value.table_number.trim()) {
      showToast('Table number is required', 'error')
      return
    }

    const restaurantId = authStore.user?.restaurant_id
    if (!restaurantId) {
      throw new Error('Restaurant ID not found')
    }

    if (isEditMode.value && editingTable.value) {
      await tableStore.updateTable(editingTable.value.id, {
        table_number: formData.value.table_number,
        is_active: formData.value.is_active,
      })
      showToast('Table updated successfully', 'success')
    } else {
      await tableStore.createTable({
        restaurant_id: restaurantId,
        table_number: formData.value.table_number,
        is_active: formData.value.is_active,
      })
      showToast('Table created successfully', 'success')
    }

    closeModal()
    fetchTables()
  } catch (error: any) {
    showToast(error.message || 'Failed to save table', 'error')
    console.error('Save table error:', error)
  }
}

// Toggle active status
const toggleActive = async (table: Table) => {
  try {
    await tableStore.updateTable(table.id, {
      is_active: !table.is_active,
    })
    showToast(
      `Table ${table.is_active ? 'deactivated' : 'activated'} successfully`,
      'success'
    )
    fetchTables()
  } catch (error: any) {
    showToast(error.message || 'Failed to update table status', 'error')
    console.error('Toggle active error:', error)
  }
}

// Open delete dialog
const openDeleteDialog = (table: Table) => {
  deletingTable.value = table
  showDeleteDialog.value = true
}

// Close delete dialog
const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  deletingTable.value = null
}

// Confirm delete
const confirmDelete = async () => {
  if (!deletingTable.value) return

  try {
    await tableStore.deleteTable(deletingTable.value.id)
    showToast('Table deleted successfully', 'success')
    closeDeleteDialog()
    fetchTables()
  } catch (error: any) {
    showToast(error.message || 'Failed to delete table', 'error')
    console.error('Delete table error:', error)
  }
}

// Regenerate QR code
const regenerateQR = async (table: Table) => {
  try {
    await tableStore.regenerateQR(table.id)
    showToast('QR code regenerated successfully', 'success')
    fetchTables()
  } catch (error: any) {
    showToast(error.message || 'Failed to regenerate QR code', 'error')
    console.error('Regenerate QR error:', error)
  }
}

// Clear table (complete all orders on the table)
const clearTable = async (table: any) => {
  try {
    if (!table.active_orders || table.active_orders.length === 0) {
      showToast('No active orders to complete', 'info')
      return
    }

    // Complete all active orders on this table
    for (const order of table.active_orders) {
      await orderStore.completeOrder(order.id)
    }

    showToast(`Table ${table.table_number} cleared successfully`, 'success')
    fetchTables()
  } catch (error: any) {
    showToast(error.message || 'Failed to clear table', 'error')
    console.error('Clear table error:', error)
  }
}

// View QR code
const viewQRCode = async (table: Table) => {
  try {
    viewingTable.value = table
    // Generate QR code from the URL
    const qrUrl = table.qr_code_url
    qrCodeDataUrl.value = await QRCode.toDataURL(qrUrl, {
      width: 300,
      margin: 2,
    })
    showQRModal.value = true
  } catch (error: any) {
    showToast(error.message || 'Failed to generate QR code', 'error')
    console.error('QR code generation error:', error)
  }
}

// Close QR modal
const closeQRModal = () => {
  showQRModal.value = false
  viewingTable.value = null
  qrCodeDataUrl.value = ''
}

// Print QR code as PDF
const printQRCodePDF = async (table: Table) => {
  try {
    // Generate QR code
    const qrUrl = table.qr_code_url
    const qrDataUrl = await QRCode.toDataURL(qrUrl, {
      width: 300,
      margin: 2,
    })

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // Add title
    pdf.setFontSize(20)
    pdf.text('Table QR Code', 105, 30, { align: 'center' })

    // Add table number
    pdf.setFontSize(16)
    pdf.text(`Table: ${table.table_number}`, 105, 40, { align: 'center' })

    // Add QR code image
    const imgWidth = 80
    const imgHeight = 80
    const x = (210 - imgWidth) / 2 // Center on A4 width (210mm)
    const y = 60
    pdf.addImage(qrDataUrl, 'PNG', x, y, imgWidth, imgHeight)

    // Add URL text
    pdf.setFontSize(10)
    pdf.text(qrUrl, 105, 150, { align: 'center' })

    // Save PDF
    pdf.save(`QR_Code_Table_${table.table_number}.pdf`)
    showToast('QR code PDF generated successfully', 'success')
  } catch (error: any) {
    showToast(error.message || 'Failed to generate PDF', 'error')
    console.error('PDF generation error:', error)
  }
}

onMounted(() => {
  fetchTables()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Table Management</h1>
        <p class="text-base-content/60 mt-1">Manage all restaurant tables</p>
      </div>
      <div class="flex gap-2">
        <button 
          @click="fetchTables" 
          class="btn btn-outline btn-sm gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
        <button 
          @click="openAddModal" 
          class="btn btn-primary btn-sm gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Table
        </button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AppCard class="bg-gradient-to-br from-blue-500 to-blue-600 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer animate-fade-in">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium">Total Tables</p>
            <h3 class="text-3xl font-bold mt-2 transition-all duration-300">{{ tableStore.summary.total_tables }}</h3>
          </div>
          <svg class="w-12 h-12 opacity-50 transition-all duration-300 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
      </AppCard>

      <AppCard class="bg-gradient-to-br from-green-500 to-green-600 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer animate-fade-in" style="animation-delay: 0.1s">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium">Available</p>
            <h3 class="text-3xl font-bold mt-2 transition-all duration-300">{{ tableStore.summary.available_count }}</h3>
          </div>
          <svg class="w-12 h-12 opacity-50 transition-all duration-300 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </AppCard>

      <AppCard class="bg-gradient-to-br from-red-500 to-red-600 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer animate-fade-in" style="animation-delay: 0.2s">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-red-100 text-sm font-medium">Occupied</p>
            <h3 class="text-3xl font-bold mt-2 transition-all duration-300">{{ tableStore.summary.occupied_count }}</h3>
          </div>
          <svg class="w-12 h-12 opacity-50 transition-all duration-300 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </AppCard>
    </div>

    <!-- All Tables List -->
    <AppCard v-if="!loading && tableStore.tables.length > 0" title="All Tables">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Table Number</th>
              <th>QR Code</th>
              <th>Status</th>
              <th>Active</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(table, index) in tableStore.tables" 
              :key="table.id"
              class="transition-all duration-300 hover:bg-base-200 animate-fade-in"
              :style="{ animationDelay: `${index * 0.03}s` }"
            >
              <td class="font-semibold">{{ table.table_number }}</td>
              <td>
                <div class="flex gap-1">
                  <button
                    @click="viewQRCode(table)"
                    class="btn btn-xs btn-primary gap-1"
                    title="View QR Code"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View
                  </button>
                  <button
                    @click="printQRCodePDF(table)"
                    class="btn btn-xs btn-info gap-1"
                    title="Print QR Code as PDF"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                    Print
                  </button>
                  <button
                    @click="regenerateQR(table)"
                    class="btn btn-xs btn-ghost gap-1"
                    title="Regenerate QR"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                    Regenerate
                  </button>
                </div>
              </td>
              <td>
                <span
                  v-if="
                    tableStore.occupiedTables.some((t) => t.id === table.id)
                  "
                  class="badge badge-error badge-sm"
                >
                  Occupied
                </span>
                <span
                  v-else-if="
                    tableStore.availableTables.some((t) => t.id === table.id)
                  "
                  class="badge badge-success badge-sm"
                >
                  Available
                </span>
                <span v-else class="badge badge-ghost badge-sm">Unknown</span>
              </td>
              <td>
                <input
                  type="checkbox"
                  :checked="table.is_active"
                  @change="toggleActive(table)"
                  class="toggle toggle-success toggle-sm"
                />
              </td>
              <td class="text-right">
                <div class="flex gap-2 justify-end">
                  <button
                    @click="openEditModal(table)"
                    class="btn btn-sm btn-outline btn-info gap-1 transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    @click="openDeleteDialog(table)"
                    class="btn btn-sm btn-outline btn-error gap-1 transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppCard>

    <!-- Occupied Tables with Clear Option -->
    <AppCard v-if="!loading && tableStore.occupiedTables.length > 0" title="Occupied Tables">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(table, index) in tableStore.occupiedTables"
          :key="table.id"
          class="card bg-base-200 border border-error/20 transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          <div class="card-body">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="card-title text-error">{{ table.table_number }}</h3>
                <span class="badge badge-error badge-sm mt-1">Occupied</span>
              </div>
              <button
                class="btn btn-sm btn-success gap-1 transition-all duration-300 hover:scale-110 active:scale-95"
                @click="clearTable(table)"
                title="Complete orders and clear table"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Clear Table
              </button>
            </div>

            <!-- Active Orders -->
            <div v-if="table.active_orders" class="mt-4 space-y-2">
              <p class="text-sm font-semibold text-base-content/70">Active Orders:</p>
              <div
                v-for="order in table.active_orders"
                :key="order.id"
                class="text-sm bg-base-100 p-2 rounded"
              >
                <div class="flex justify-between items-center">
                  <span class="font-mono">{{ order.order_number }}</span>
                  <span class="badge badge-sm" :class="{
                    'badge-warning': order.payment_status === 'unpaid',
                    'badge-success': order.payment_status === 'paid'
                  }">
                    {{ order.payment_status }}
                  </span>
                </div>
                <div class="flex justify-between mt-1 text-base-content/60">
                  <span>Total:</span>
                  <span class="font-semibold">
                    Rp {{ order.total_amount?.toLocaleString('id-ID') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppCard>

    <!-- Empty State -->
    <AppCard v-if="!loading && tableStore.tables.length === 0">
      <div class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-base-content/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-semibold text-base-content">No tables</h3>
        <p class="mt-1 text-sm text-base-content/60">
          Get started by creating a new table.
        </p>
        <div class="mt-6">
          <button class="btn btn-primary btn-sm" @click="openAddModal">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Table
          </button>
        </div>
      </div>
    </AppCard>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <div class="skeleton h-12 w-full"></div>
      <div class="skeleton h-12 w-full"></div>
      <div class="skeleton h-12 w-full"></div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">{{ modalTitle }}</h3>
        <form @submit.prevent="saveTable" class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Table Number</span>
            </label>
            <input
              v-model="formData.table_number"
              type="text"
              placeholder="e.g. Table 1, A1, etc."
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-4">
              <input
                v-model="formData.is_active"
                type="checkbox"
                class="toggle toggle-success"
              />
              <span class="label-text">Active</span>
            </label>
            <label class="label">
              <span class="label-text-alt text-base-content/60">
                Inactive tables won't be available for orders
              </span>
            </label>
          </div>

          <div class="modal-action">
            <button type="button" @click="closeModal" class="btn btn-ghost">Cancel</button>
            <button type="submit" class="btn btn-primary">
              {{ isEditMode ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
      <div class="modal-backdrop" @click="closeModal"></div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="showDeleteDialog" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Confirm Delete</h3>
        <p class="py-4">
          Are you sure you want to delete table
          <strong>{{ deletingTable?.table_number }}</strong>? This action cannot be undone.
        </p>
        <div class="modal-action">
          <button @click="closeDeleteDialog" class="btn btn-ghost">Cancel</button>
          <button @click="confirmDelete" class="btn btn-error">Delete</button>
        </div>
      </div>
      <div class="modal-backdrop" @click="closeDeleteDialog"></div>
    </div>

    <!-- QR Code View Modal -->
    <div v-if="showQRModal" class="modal modal-open">
      <div class="modal-box max-w-md">
        <h3 class="font-bold text-lg mb-4">
          QR Code - Table {{ viewingTable?.table_number }}
        </h3>
        <div class="flex flex-col items-center space-y-4">
          <div v-if="qrCodeDataUrl" class="bg-white p-4 rounded-lg">
            <img :src="qrCodeDataUrl" alt="QR Code" class="w-64 h-64" />
          </div>
          <div class="text-center">
            <p class="text-sm text-base-content/60 mb-2">Scan this QR code to order</p>
            <p class="text-xs font-mono text-base-content/40 break-all">
              {{ viewingTable?.qr_code_url }}
            </p>
          </div>
          <div class="flex gap-2 w-full">
            <button @click="printQRCodePDF(viewingTable!)" class="btn btn-primary flex-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print PDF
            </button>
            <button @click="closeQRModal" class="btn btn-ghost flex-1">Close</button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop" @click="closeQRModal"></div>
    </div>
  </div>
</template>

