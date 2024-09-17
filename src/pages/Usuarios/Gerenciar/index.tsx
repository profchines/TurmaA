import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { IToken } from "../../../interfaces/token";
import { verificaTokenExpirado } from "../../../services/token";
import { LayoutDashboard } from "../../../components/LayoutDashboard";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface IForm {
    nome: string
    email: string
    password: string
    permissoes: string
}

export default function GerenciarUsuarios() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IForm>()

    const refForm = useRef<any>();

    const navigate = useNavigate();

    // Inicio, Update State, Destruir
    useEffect(() => {

        let lsStorage = localStorage.getItem('americanos.token')

        let token: IToken | null = null

        if (typeof lsStorage === 'string') {
            token = JSON.parse(lsStorage)
        }


        if (!token || verificaTokenExpirado(token.accessToken)) {

            navigate("/")
        }

        console.log("Pode desfrutar do sistema :D")

    }, [])

    const submitForm: SubmitHandler<IForm> = useCallback(
        (data) => {

            axios.post('http://localhost:3001/users',
                data
            ).then((res) => {
                navigate('/usuarios')
            })
                .catch((err) => {
                    console.log(err)
                })

        }, [])

    return (
        <>
            <LayoutDashboard>
                <h1>Usuários</h1>

                <form
                    className="row g-3 needs-validation mb-3"
                    noValidate
                    style={{
                        alignItems: 'center'
                    }}
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault()

                        refForm.current.classList.add('was-validated')

                        handleSubmit(submitForm)(event)

                    }}
                    ref={refForm}
                // ref={(valorReferenciaHtml) => { refForm.current = valorReferenciaHtml }}
                >
                    <div className="col-md-12">
                        <label
                            htmlFor="nome"
                            className="form-label"
                        >
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Yuri"
                            id="nome"
                            required
                            {...register('nome',
                                {
                                    required: 'Nome é obrigatório!',
                                }
                            )}
                        />
                        <div className="invalid-feedback">
                            {errors.nome && errors.nome.message}
                        </div>

                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="email"
                            className="form-label"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Yuri"
                            id="email"
                            required
                            {...register('email',
                                {
                                    required: 'Email é obrigatório!',
                                }
                            )}
                        />
                        <div className="invalid-feedback">
                            {errors.email && errors.email.message}
                        </div>

                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="permissoes"
                            className="form-label"
                        >
                            Perfil
                        </label>

                        <select
                            className="form-select"
                            defaultValue={''}
                            id="permissoes"
                            required
                            {
                                ...register("permissoes",
                                    {required: 'Selecione'}
                                )
                            }
                        >
                            <option value="">
                                Selecione o tipo
                            </option>
                            <option value="admin">
                                Admin
                            </option>
                            <option value="colaborador">
                                Colaborador
                            </option>
                        </select>
                        <div className="invalid-feedback">
                            {errors.permissoes && errors.permissoes.message}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="password"
                            className="form-label"
                        >
                            Senha
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Yuri"
                            id="password"
                            required
                            {...register('password',
                                {
                                    required: 'Senha é obrigatório!',
                                }
                            )}
                        />
                        <div className="invalid-feedback">
                            {errors.password && errors.password.message}
                        </div>

                    </div>

                    <div className="col-md-12">
                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </LayoutDashboard>
        </>
    )
}