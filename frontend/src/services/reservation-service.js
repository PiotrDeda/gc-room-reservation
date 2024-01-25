import http from "../http-common";

const url = "/reservations";

class ReservationService {
    getAll() {
        return http.get(url);
    }

    get(id) {
        return http.get(`${url}/${id}`);
    }

    getByUser(id) {
        return http.get(`${url}/user/${id}`);
    }

    create(data) {
        return http.post(url, data);
    }

    delete(id) {
        return http.delete(`${url}/${id}`);
    }
}

export default new ReservationService();
