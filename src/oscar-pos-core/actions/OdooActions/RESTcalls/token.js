import axios from 'axios'


export default class Tokens {
    static deleteToken = () => {
            try {
                localStorage.removeItem('acces_token')
                axios.defaults.headers.common['Authorization'] = null;
            } catch (error) {
            }
    }

    static saveToken = (acces_token) => {
            try {
                const token = `Token ${acces_token}`;
                localStorage.setItem('acces_token', token)
                axios.defaults.headers.common['Authorization'] = token;
            } catch (error) {
            }
    }

    static getToken = () => {
            try {
                var acces_token = localStorage.getItem('acces_token');
                axios.defaults.headers.common['Authorization'] = acces_token;
                return acces_token;
            } catch (error) {
            }
    }
}