import axios from "axios";

const API_URL = "/api/goals/";

//get user goals
const getUserGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    console.log(response);
    return response.data;
};

//create user goal
const createUserGoal = async (goal, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, goal, config);
    return response.data;
};

// delete user goal
const deleteUserGoal = async (goalID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + goalID, config);
    return response.data;
};

const goalService = {
    getUserGoals,
    createUserGoal,
    deleteUserGoal,
};

export default goalService;
