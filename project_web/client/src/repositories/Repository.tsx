// @ts-ignore
export class Repository<I, O> {
    route:string;

    constructor(route: string) {
        this.route = route;
    }

    protected get(method: string): Promise<O> {
        let route = this.route + "/" + method;

        return fetch(route, {
            method: "GET",
            headers: {},
        })
            .then((response) => response.json())
            .catch((err) => {throw err})
            .then((data:O) => {return data});
    }

    protected post(method:string): Promise<O> {
        let route = this.route + "/" + method;

        return fetch(route, {
            method: "POST"
        })
            .then((response) => response.json())
            .catch((err) => {throw err})
            .then ((data: O) => {return data})
    }

    protected postWithData(method: string, data: I): Promise<O> {
        let route = this.route + "/" + method;

        return fetch(route, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .catch((err) => {throw err})
            .then((data: O) => {return data})
    }
}