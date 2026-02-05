import axios from 'axios';
import { getObjectData } from '../storage/data';
import refresh from "./autoReloadToken";

const getPastMatches = async (slugs, router = null) => {
    if (!slugs) {
        return;
    }
    try {
        const token = await getObjectData('token');
        // 2. Fetch data for each slug
        const matchPromises = slugs.map(async (slug) => {
            const options = {
                method: 'GET',
                url: `https://api.pandascore.co/teams/${slug}/matches`,
                params: {
                    'filter[status]': 'finished',
                    'sort': '-begin_at',
                    per_page: '25',
                },
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`,
                },
            };
            const match = await axios.request(options).then(function (response) {
                return response.data;
            });

            return match;
        });
        const matches = await Promise.all(matchPromises);
        const sortedMatches = matches.flat().sort((a, b) => new Date(b.begin_at) - new Date(a.begin_at));
        return sortedMatches;
    } catch (error) {
        if (error.response && error.response.status === 401 && router) {
            router.replace("/token/initToken");
        }
    }
}

const getUpcomingMatches = async (slugs, router = null) => {
    if (!slugs) {
        return;
    }
    try {
        const token = await getObjectData('token');
        const matchPromises = slugs.map(async (slug) => {
            const options = {
                method: 'GET',
                url: `https://api.pandascore.co/teams/${slug}/matches`,
                params: {
                    per_page: '15',
                },
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`,
                },
            };
            const match = await axios.request(options).then(function (response) {
                return response.data;
            });
            const filteredMatch = match.filter((match) => match.status === 'not_started' || match.status === 'running');
            return filteredMatch;
        });

        const matches = await Promise.all(matchPromises);
        const sortedMatches = matches.flat().sort((a, b) => new Date(a.begin_at) - new Date(b.begin_at));
        return sortedMatches;
    } catch (error) {
        const token = await getObjectData("token");
        if (error.response && error.response.status === 429) {
            refresh(token);
        }
        if (error.response && error.response.status === 401 && router) {
            router.replace("/token/initToken");
        }
    }
}

const getNextMatch = async (slugs, router = null) => {
    if (!slugs) {
        return;
    }
    try {
        const token = await getObjectData('token');
        const matchPromises = slugs.map(async (slug) => {
            const options = {
                method: 'GET',
                url: `https://api.pandascore.co/teams/${slug}/matches`,
                params: {
                    per_page: '20',
                },
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`,
                },
            };
            const match = await axios.request(options).then(function (response) {
                return response.data;
            });
            const filteredMatch = match.filter((match) => match.status === 'not_started' || match.status === 'running');
            return filteredMatch;
        });

        const matches = await Promise.all(matchPromises);
        const nextMatch = matches.flat().sort((a, b) => new Date(a.begin_at) - new Date(b.begin_at))[0];

        return nextMatch;
    } catch (error) {
        const token = await getObjectData("token");
        if (error.response && error.response.status === 429) {
            refresh(token);
        }
        if (error.response && error.response.status === 401 && router) {
            router.replace("/token/initToken");
        }
    }
}

export { getPastMatches, getUpcomingMatches, getNextMatch };