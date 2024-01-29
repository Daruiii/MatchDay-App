import axios from 'axios';
import { storeObjectData } from '../storage/data';
import { useRouter } from "expo-router";

const refresh = async (token) => {
    const router = useRouter();
    try {
        const optionsRefresh = {
            method: 'PUT',
            url: 'https://registration.pandascore.co/dashboard_api/users/me/access_token',
            headers: {
                Accept: 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`,
            },
        };
        const newToken = await axios.request(optionsRefresh).then(function (response) {
            const newToken = response.data.data.token;
            return newToken;
        });
        // console.log("newToken: ", newToken);
        await storeObjectData('token', newToken);
        router.replace('/');
    } catch (error) {
        console.log("dataError: ", error);
    }
};

export default refresh;