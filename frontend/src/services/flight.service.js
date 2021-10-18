
import { httpService } from './http.service'


export const flightService = {
    query,

}

async function query() {
    try {
        return await httpService.get('flight')
    } catch (err) {
        throw err
    }
}
