/** @odoo-module **/
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
const { Component, useState, onWillStart, useRef } = owl;

export class TodoTask extends Component {

    setup() {
        super.setup();
        this.state = useState({
            taskList: [],
            task: {
                name: "",
                color: "#000000",
                is_done: false,
                description: ""
            },
            isEdit: false,
            activeId: false,
            current_search_domain: [["name", "ilike", ""]]
        });
        this.orm = useService("orm")
        this.searchInput = useRef("search-input")

        onWillStart(async ()=>{
            await this.getAllTasks()
        })
    }

    async getAllTasks(){
        console.log(await this.orm.call("todo.task", "test", [1,2,3], {"qq": 1}))
        this.state.taskList = await this.orm.searchRead("todo.task", this.state.current_search_domain, ["name", "color", "is_done", "description"])
    }

    addTask(){
        this.resetForm()
        this.state.isEdit = false
        this.state.activeId = false
    }

    editTask(task){
        console.log(task)
        this.state.task = task
        this.state.isEdit = true
        this.state.activeId = task.id
    }

    async deleteTask(id){
        console.log(id)
        await this.orm.unlink("todo.task", [id], {})
        await this.getAllTasks()
    }

    async saveTask(){
        console.log(this.state.task)
        if (this.state.isEdit) {
            await this.orm.write("todo.task", [this.state.activeId], this.state.task)
        } else {
            await this.orm.create("todo.task", [this.state.task])
            this.resetForm()
        }
        await this.getAllTasks()
    }

    async closeEdit(){
        console.log('close...edit task')
        await this.getAllTasks()
    }

    resetForm(){
        this.state.task = {
                name: "",
                color: "#000000",
                is_done: false,
                description: ""
        }
    }

    async searchTask(){
        console.log("search...here")
        console.log(this.searchInput)

        const search_val = this.searchInput.el.value.trim()
        this.state.current_search_domain = [["name", "ilike", search_val]]
        console.log(this.state.current_search_domain)

        this.state.taskList = await this.orm.searchRead("todo.task", this.state.current_search_domain, ["name", "color", "is_done", "description"])

    }

    async updateColor(e, task){
        console.log(e.target)
        console.log(e.target.value)
        await this.orm.write("todo.task", [task.id], {
            color: e.target.value
        })
        await this.getAllTasks()
    }

    async checkDone(task){
        console.log(task)
        const is_done_val = !task.is_done
        console.log(is_done_val)
        await this.orm.write("todo.task", [task.id], {
            is_done: is_done_val
        })
        await this.getAllTasks()

    }
}

TodoTask.template = "todo_task_module.TodoTask";
registry.category("actions").add("todo_task_module.action_todo_task_js", TodoTask)