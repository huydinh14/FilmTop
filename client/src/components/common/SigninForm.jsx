import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import userApi from '../../api/modules/user.api'
import { setUser } from '../../redux/features/userSlice'
import { setAuthModalOpen } from '../../redux/features/authModalSlice'
import { toast } from 'react-toastify'
import { Alert, Box, Button, Stack, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

const SigninForm = ({ switchAuthState }) => {

    const dispatch = useDispatch()

    const [isLoginRequesting, setIsLoginRequesting] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const signinForm = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(8, "username minimum 8 characters")
                .required("Username is required"),
            password: Yup.string()
                .min(8, "password minimum 8 characters")
                .required("Password is required")
        }),
        onSubmit: async (values) => {
            setErrorMessage(undefined)
            setIsLoginRequesting(true)
            const { response, error } = await userApi.signin(values)
            setIsLoginRequesting(false)
            if (response) {
                signinForm.resetForm()
                dispatch(setUser(response))
                dispatch(setAuthModalOpen(false))
                toast.success("Signin successfully")
            }

            if (error) {
                setErrorMessage(error.message)
            }
        }
    })

    return (
        <Box component="form" onSubmit={signinForm.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    type="text"
                    placeholder="Username"
                    name='username'
                    fullWidth
                    value={signinForm.values.username}
                    onChange={signinForm.handleChange}
                    color="success"
                    error={signinForm.touched.username && signinForm.errors.username !== undefined}
                    helperText={signinForm.touched.username && signinForm.errors.username}>
                </TextField>
                <TextField
                    type="password"
                    placeholder="Password"
                    name='password'
                    fullWidth
                    value={signinForm.values.password}
                    onChange={signinForm.handleChange}
                    color="success"
                    error={signinForm.touched.password && signinForm.errors.password !== undefined}
                    helperText={signinForm.touched.password && signinForm.errors.password}>
                </TextField>
            </Stack>
            <Stack direction="column" spacing={2}>
                <LoadingButton
                    type='submit'
                    fullWidth
                    size='large'
                    variant='contained'
                    sx={{ marginTop: 4 }}
                    loading={isLoginRequesting}>
                    Sign In
                </LoadingButton>

                <Button
                    fullWidth
                    sx={{ marginTop: 1 }}
                    onClick={() => switchAuthState()}>
                    Sign Up
                </Button>
            </Stack>

            {
                errorMessage && (
                    <Box sx={{ marginTop: 2 }}>
                        <Alert severity='error' variant='outlined'>{errorMessage}</Alert>
                    </Box>
                )
            }
        </Box>
    )
}

export default SigninForm