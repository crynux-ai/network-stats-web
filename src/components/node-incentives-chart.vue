<script setup>
import incentivesAPI from "@/api/v1/incentives";
import {onMounted, reactive, ref, watch} from "vue";

const props = defineProps({
    network: {
        type: String,
        required: true
    }
});

const loading = ref(true);
const periodOptions = reactive(['Day', "Week", "Month"]);
const periodSelected = ref(periodOptions[0]);

const nodeList = ref([]);

const columns = [
    {
        title: 'Address',
        dataIndex: 'node_address',
        key: 'node_address'
    },
    {
        title: 'Card',
        dataIndex: 'card_model',
        key: 'card_model'
    },
    {
        title: 'Task Count',
        dataIndex: 'task_count',
        key: 'task_count'
    },
    {
        title: 'QoS Score',
        dataIndex: 'qos',
        key: 'qos'
    },
    {
        title: 'Incentives',
        dataIndex: 'incentive',
        key: 'incentive'
    }
];

watch([periodSelected, () => props.network], async () => {
    await fetchData()
});

onMounted(async () => {
    await fetchData()
});

const fetchData = async () => {
    loading.value = true;
    try {
         const resp = await incentivesAPI.getNodes(periodSelected.value);
         nodeList.value = resp.nodes;
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div style="height:40px">
        <div style="float: left">
            <a-segmented v-model:value="periodSelected" :options="periodOptions" size="small"/>
        </div>
    </div>
    <a-table
        :data-source="nodeList"
        :columns="columns"
        :loading="loading"
        :pagination="{
            'pageSize': 5
        }"
        size="small"
    >
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'node_address'">
                    {{ record.node_address.substring(0, 10) }}...{{ record.node_address.substring(record.node_address.length - 10, record.node_address.length) }}
            </template>
            <template v-else-if="column.key === 'incentive'">
                    CNX {{ record.incentive.toFixed(2) }}
            </template>
        </template>
    </a-table>
</template>

<style scoped>
</style>
