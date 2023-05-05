import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpCore } from "Http/http";
import { PostUserData } from "Pages/RegisterUsers/utils/classes";
import { DeleteUserData } from "Pages/Users/Components/ShowUserData/Components/ShowConfirmUserDelete/utils/classes";
import { PutPermissionsData } from "Pages/Users/Components/ShowUserData/Components/ShowUserPermissions/utils/classes";
import { PutUserData } from "Pages/Users/Components/ShowUserData/utils/classes";
import { GetUsersData } from "Pages/Users/utils/classes";
import { deleteUser, getUsers, postUser, putUser } from "./reducer";

export function getUsersThunk({ userId, dispatch, setError, setLoading }: GetUsersData) {
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

export function deleteUserThunk({ dispatch, analystId, adminId, setError, setLoading }: DeleteUserData) {
    const thunk = createAsyncThunk(
        "users/DELETE",
        async () => {
            httpCore.delete(`/register-superuser/${analystId}/${adminId}/`)
                .then(() => {
                    setLoading(true);
                    dispatch(deleteUser(analystId));
                })
                .catch(error => {
                    setError(error.response.status);
                })
        }
    );

    return thunk();
}

export function putUserThunk({ dispatch, analyst, userId, setError, setLoading }: PutUserData) {
    const thunk = createAsyncThunk(
        "users/PUT",
        async () => {
            httpCore.put("/register-coordinator/", {
                "name": analyst.name,
                "cpf": analyst.cpf,
                "department": analyst.department,
                "phone": analyst.phone,
                "analyst_type": analyst.analystType,
                "branch": analyst.branch,
                "user_id": analyst.id,
                "admin_id": userId
            })
                .then(response => {
                    setLoading(true);
                    dispatch(putUser(response.data));
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
                "is_audit": permissions.isAudit,
                "is_validator": permissions.isValidator,
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
                    dispatch(postUser(response.data));
                })
                .catch(error => {
                    setError(error.response.status);
                })
        }
    );

    return thunk();
}