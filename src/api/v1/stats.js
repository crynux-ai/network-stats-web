import BaseAPI from '../base-api'
import v1 from './v1'

class StatsAPI extends BaseAPI {
    getTaskDuration(taskType, period) {
        return v1.get('/stats/histogram/task_execution_time?task_type=' + taskType + '&period=' + period)
    }

    getTaskNumber(taskType, period) {
        return v1.get('/stats/line_chart/task_count?task_type=' + taskType + '&period=' + period)
    }

    getTaskSuccessRate(taskType, period) {
        return v1.get('/stats/line_chart/task_success_rate?task_type=' + taskType + '&period=' + period)
    }

    getTaskPrice(taskType) {
        return v1.get('/stats/histogram/task_fee?task_type=' + taskType)
    }
}

const statsAPI = new StatsAPI()

export default statsAPI
