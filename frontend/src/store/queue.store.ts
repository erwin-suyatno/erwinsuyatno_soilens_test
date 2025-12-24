import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Queue } from '@/types/queue'

export const useQueueStore = defineStore('queue', () => {
  // State
  const queue = ref<Queue[
  ]>([
    {
      id: 1,
      status: 'waiting',
      noQueue: 'QU/25122025/00001',
      priority: 'high',
      reason: 'Kerusakan Mesin macet tidak bisa hidup',
      machine: 'Machine 1', //bisa objectId karena nanti saya akan buatkan masterdata machine
      createdAt: new Date('2025-12-20T00:00:00.000Z'),
      updatedAt: new Date('2025-12-20T00:00:00.000Z'),
      lastUpdated: 'User 1',
    },
    {
      id: 2,
      status: 'repairing',
      noQueue: 'QU/25122025/00002',
      priority: 'high',
      reason: 'Kerusakan Mesin Utama overheat',
      machine: 'Machine 3', //bisa objectId karena nanti saya akan buatkan masterdata machine
      createdAt: new Date('2025-12-22T00:00:00.000Z'),
      updatedAt: new Date('2025-12-22T00:00:00.000Z'),
      lastUpdated: 'User 1',
    },
    {
      id: 3,
      status: 'waiting',
      noQueue: 'QU/25122025/00001',
      priority: 'medium',
      reason: 'Kerusakan Mesin macet tidak bisa hidup',
      machine: 'Machine 1', //bisa objectId karena nanti saya akan buatkan masterdata machine
      createdAt: new Date('2025-12-20T00:00:00.000Z'),
      updatedAt: new Date('2025-12-20T00:00:00.000Z'),
      lastUpdated: 'User 1',
    },
    {
      id: 4,
      status: 'checking',
      noQueue: 'QU/21122025/00133',
      priority: 'low',
      reason: 'Gear macet kurang oli',
      machine: 'Machine 2', //bisa objectId karena nanti saya akan buatkan masterdata machine
      createdAt: new Date('2025-12-19T00:00:00.000Z'),
      updatedAt: new Date('2025-12-19T00:00:00.000Z'),
      lastUpdated: 'User 1',
    },
    {
      id: 5,
      status: 'completed',
      noQueue: 'QU/25122025/00005',
      priority: 'high',
      reason: 'Kerusakan Mesin Utama overheat',
      machine: 'Machine 3', //bisa objectId karena nanti saya akan buatkan masterdata machine
      createdAt: new Date('2025-12-22T00:00:00.000Z'),
      updatedAt: new Date('2025-12-22T00:00:00.000Z'),
      lastUpdated: 'User 1',
    }
  ])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
// all sort by priority low, medium, high
  const waitingQueue = computed(() => queue.value.filter((q) => q.status === 'waiting').sort((a, b) => {
    if (a.priority === 'low') return -1
    if (a.priority === 'medium') return 0
    if (a.priority === 'high') return 1
  }))
  const checkingQueue = computed(() => queue.value.filter((q) => q.status === 'checking').sort((a, b) => {
    if (a.priority === 'low') return -1
    if (a.priority === 'medium') return 0
    if (a.priority === 'high') return 1
  }))
  const repairingQueue = computed(() => queue.value.filter((q) => q.status === 'repairing').sort((a, b) => {
    if (a.priority === 'low') return -1
    if (a.priority === 'medium') return 0
    if (a.priority === 'high') return 1
  }))
  const completedQueue = computed(() => queue.value.filter((q) => q.status === 'completed').sort((a, b) => {
    if (a.priority === 'low') return -1
    if (a.priority === 'medium') return 0
    if (a.priority === 'high') return 1
  }))

  // Actions
  async function addQueue(queueData: Queue) {
    queue.value.push({
      id: queue.value.length + 1,
      status: 'waiting',
      noQueue: `QU/25122025/${queue.value.length + 1}`,
      priority: queueData.priority || 'low',
      reason: queueData.reason,
      machine: queueData.machine,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastUpdated: queueData.lastUpdated,
    })
  }

  async function startRepairing(queueId: number) {
    queue.value.find((q) => q.id === queueId)!.status = 'repairing'
  }

  async function startChecking(queueId: number) {
    queue.value.find((q) => q.id === queueId)!.status = 'checking'
  }

  async function startCompleted(queueId: number) {
    queue.value.find((q) => q.id === queueId)!.status = 'completed'
  }

  return {
    queue,
    loading,
    error,
    // Getters
    waitingQueue,
    checkingQueue,
    repairingQueue,
    completedQueue,
    // Actions
    addQueue,
    startRepairing,
    startChecking,
    startCompleted,
  }
})