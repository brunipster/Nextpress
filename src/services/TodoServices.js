import { HttpService } from "@Services/HttpService";

export class TodoServices extends HttpService {
    constructor() {
        super()
        this.setApiKey("AFFILIATION_API_KEY")
    }

    getAllTask(){
        return this.get(`/task/all`)
    }

    completeTask(id){
        return this.post(`/task/complete`,{id})
    }

    createTask(name){
        return this.post(`/task/complete`,{name})
    }
}