<script setup lang="ts">
/**
 * Dashboard Page
 * Main dashboard with statistics and overview
 */

import { ref, onMounted, computed } from "vue";
// import { useAuthStore } from '@/store/auth.store'
// import { api } from '@/utils/api'
import { useToast } from "@/composables/useToast";
import type { StatisticsResponse } from "@/types/api";
// import { formatCurrency } from '@/utils/formatCurrency'
import { useQueueStore } from "@/store/queue.store";
import AppButton from "../../components/common/AppButton.vue";
import AppInput from "../../components/common/AppInput.vue";
// const authStore = useAuthStore()
const { showToast } = useToast();
// const loading = ref(true);
// const refreshing = ref(false);
// const stats = ref<StatisticsResponse | null>(null);
const queueStore = useQueueStore();

// Fetch statistics
// const fetchStatistics = async (showRefreshing = false) => {
//   if (showRefreshing) {
//     refreshing.value = true
//   } else {
//     loading.value = true
//   }
//   try {
//     const restaurantId = authStore.user?.restaurant_id
//     if (!restaurantId) {
//       throw new Error('Restaurant ID not found. Please login again.')
//     }
//     const response = await api.get<StatisticsResponse>('/orders-statistics', {
//       params: {
//         restaurant_id: restaurantId,
//       },
//     })

//     console.log(response.data)
//     stats.value = response.data || null
//     if (showRefreshing) {
//       showToast('Statistics updated', 'success')
//     }
//   } catch (error) {
//     console.error('Failed to fetch statistics:', error)
//     showToast('Failed to load statistics', 'error')
//   } finally {
//     loading.value = false
//     refreshing.value = false
//   }
// }

const formData = ref({
  noQueue: "",
  priority: "",
  reason: "",
  machine: "",
  lastUpdated: "",
});
// Computed values
// const completionRate = computed(() => {
//   if (!stats.value) return 0;
//   return Math.round(
//     (stats.value.completed_orders / stats.value.total_orders) * 100
//   );
// });

const waitingQueue = computed(() => queueStore.waitingQueue);
const checkingQueue = computed(() => queueStore.checkingQueue);
const repairingQueue = computed(() => queueStore.repairingQueue);
const completedQueue = computed(() => queueStore.completedQueue);

const startRepairing = async (queueId: number) => {
  try {
    await queueStore.startRepairing(queueId);
    showToast("Queue started repairing successfully", "success");
  } catch (error) {
    showToast("Failed to start repairing", "error");
  }
};
const startChecking = async (queueId: number) => {
  try {
    await queueStore.startChecking(queueId);
    showToast("Queue started checking successfully", "success");
  } catch (error) {
    showToast("Failed to start checking", "error");
  }
};
const startCompleted = async (queueId: number) => {
  try {
    await queueStore.startCompleted(queueId);
    showToast("Queue started completed successfully", "success");
  } catch (error) {
    showToast("Failed to start completed", "error");
  }
};

const addQueue = async () => {
  const payload = {
    noQueue: formData.value.noQueue || "",
    priority: formData.value.priority || "low",
    reason: formData.value.reason || "",
    machine: formData.value.machine || "",
    lastUpdated: formData.value.lastUpdated || "",
  };
  try {
    await queueStore.addQueue(payload);

    showToast("Queue added successfully", "success");
  } catch (error) {
    showToast("Failed to add queue", "error");
  }
};
onMounted(() => {
  // fetchStatistics()
});
</script>

<template>
  <div class="space-y-6">
    <!-- form add queue -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Add Queue</h2>
        <!-- form add queue -->
        <div>
          <label
            for="priority"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Priority *
          </label>
          <select
            id="priority"
            v-model="formData.priority"
            class="select select-bordered w-full"
            required
            placeholder="Select Priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <AppInput
          v-model="formData.reason"
          label="Reason"
          placeholder="Reason"
          required
        />
        <AppInput
          v-model="formData.machine"
          label="Machine"
          placeholder="Machine"
          required
        />
        <AppInput
          v-model="formData.lastUpdated"
          label="User"
          placeholder="User"
        />
        <AppButton variant="primary" size="sm" @click="addQueue"
          >Add Queue</AppButton
        >
      </div>
    </div>
    <!-- Page Queue with status waiting, checking, repairing, completed -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Waiting</h2>
          <!-- List of waiting queue -->
          <div class="list-group space-y-2">
            <div
              class="list-group-item"
              v-for="queue in waitingQueue"
              :key="queue.id"
            >
              <div class="card bg-base-100 shadow-xl justify-between">
                <!-- information queue -->
                <div class="card-body">
                  <div class="flex items-center justify-between">
                    <span>{{ queue.noQueue }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.priority }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.reason }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.machine }}</span>
                  </div>
                </div>

                <!-- button actions -->
                <div class="card-actions justify-end">
                  <AppButton
                    variant="primary"
                    size="sm"
                    @click="startChecking(queue.id)"
                  >
                    Start Checking
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Checking</h2>
          <!-- List of checking queue -->
          <div class="list-group space-y-2">
            <div
              class="list-group-item"
              v-for="queue in checkingQueue"
              :key="queue.id"
            >
              <div class="card bg-base-100 shadow-xl justify-between">
                <!-- information queue -->
                <div class="card-body">
                  <div class="flex items-center justify-between">
                    <span>{{ queue.noQueue }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.priority }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.reason }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.machine }}</span>
                  </div>
                </div>

                <!-- button actions -->
                <div class="card-actions justify-end">
                  <AppButton
                    variant="secondary"
                    size="sm"
                    @click="startRepairing(queue.id)"
                  >
                    Start Repairing
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Repairing</h2>
          <!-- List of repairing queue -->
          <div class="list-group space-y-2">
            <div
              class="list-group-item"
              v-for="queue in repairingQueue"
              :key="queue.id"
            >
              <div class="card bg-base-100 shadow-xl justify-between">
                <!-- information queue -->
                <div class="card-body">
                  <div class="flex items-center justify-between">
                    <span>{{ queue.noQueue }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.priority }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.reason }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.machine }}</span>
                  </div>
                </div>
                <div class="card-actions justify-end">
                  <AppButton
                    variant="primary"
                    size="sm"
                    @click="startCompleted(queue.id)"
                  >
                    Start Completed
                  </AppButton>
                </div>
              </div>
              <!-- button actions -->
            </div>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Completed</h2>
          <!-- List of completed queue -->
          <div class="list-group space-y-2">
            <div
              class="list-group-item"
              v-for="queue in completedQueue"
              :key="queue.id"
            >
              <div class="card bg-base-100 shadow-xl justify-between">
                <!-- information queue -->
                <div class="card-body">
                  <div class="flex items-center justify-between">
                    <span>{{ queue.noQueue }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.priority }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.reason }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>{{ queue.machine }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
