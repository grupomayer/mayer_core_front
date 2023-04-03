import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpCore } from "Http/http";
import { PostUserData } from "Pages/RegisterUsers/utils/classes";
import { PutPermissionsData } from "Pages/Users/Components/ShowUserData/Components/ShowUserPermissions/utils/classes";
import { GetUsersData } from "Pages/Users/utils/classes";
import { getUsers } from "./reducer";

export function getUsersThunk({ department, userId, dispatch, setError, setLoading }: GetUsersData) {
    const thunk = createAsyncThunk(
        "users/GET",
        async () => {
            httpCore.get(`/search-user/?param=all&admin=${userId}`)
                .then(response => {
                    setLoading(true);
                    dispatch(getUsers(response.data));
                })
                .catch(error => {
                    setError(error.response.status);
                })
        }
    );

    return thunk();
}

export function putUserPermissionsThunk({ permissions, setError, setLoading }: PutPermissionsData) {
    const thunk = createAsyncThunk(
        "usersPermissions/PUT",
        async () => {
            httpCore.put("/change-permissions/", {
                "id": permissions.id,
                "is_admin": permissions.isAdmin,
                "is_financial": permissions.isFinancial,
                "is_executive_board": permissions.isExecutiveBoard,
                "is_legal_architecture": permissions.isLegalArchitecture,
                "is_publicity": permissions.isPublicity,
                "is_evtl": permissions.isEvtl,
                "is_fire_fighting": permissions.isFireFighting,
                "is_licensing": permissions.isLicensing,
                "is_wealth_management": permissions.isWealthManagement,
                "is_coordinator": permissions.isCoordinator,
                "is_analyst": permissions.isAnalyst,
                "is_register_corporate": permissions.isRegisterCorporate,
                "is_superuser": permissions.isSuperUser,
                "is_avcb": permissions.isAvcb,
                "admin_id": permissions.adminId
            })
                .then(() => {
                    setLoading(true);
                })
                .catch(error => {
                    setError(error.response.status);
                })
        }
    );

    return thunk();
}

export function postUsersThunk({ analyst, userId, dispatch, setError, setLoading }: PostUserData) {
    const thunk = createAsyncThunk(
        "users/POST",
        async () => {
            httpCore.post("/coordinator-register-analyst/", {
                "name": analyst.name,
                "email": analyst.email,
                "password": analyst.password,
                "cpf": analyst.cpf,
                "department": analyst.department,
                "phone": analyst.phone,
                "branch": analyst.branch,
                "analyst_type": analyst.analystType,
                "user_id": userId
            })
                .then(response => {
                    setLoading(true);
                    dispatch(getUsers(response.data));
                })
                .catch(error => {
                    setError(error.response.status);
                })
        }
    );

    return thunk();
}