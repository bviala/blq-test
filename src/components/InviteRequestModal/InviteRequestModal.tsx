import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useFakeAuth from '../../api/fakeAuth'

type InviteRequestModalProps = {
}

type Inputs = {
    fullName: string
    email: string
    emailConfirmation: string
}

const schema = yup.object().shape({
    fullName: yup.string().label('Full name').required().min(3),
    email: yup.string().label('Email').email().required(),
    emailConfirmation: yup.string().label('Confirm email').required().oneOf([yup.ref('email')], 'Email does not match')
}).required()

const InviteRequestModal = ({}: InviteRequestModalProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: '',
            email: '',
            emailConfirmation: ''
        }
    })

    const { fakeAuth, error, isPending } = useFakeAuth()

    const submitRequest = (inputs: Inputs) => {
        fakeAuth({
            name: inputs.fullName,
            email: inputs.email
        })
    }

    return (
        <>
            <h1>Request an invite</h1>
            <form onSubmit={handleSubmit(submitRequest)}>
                <input {...register('fullName')} placeholder="Full name" />
                <p className='input-error'>{errors.fullName?.message}</p>
                <input {...register('email')} placeholder="Email" />
                <p className='input-error'>{errors.email?.message}</p>
                <input {...register('emailConfirmation')} placeholder="Confirm Email" />
                <p className='input-error'>{errors.emailConfirmation?.message}</p>
                <input type="submit" disabled={isPending} value={isPending ? 'Sending, please wait...' :  'Submit'} />
                <p className='input-error'>{ error }</p>
            </form>
        </>
    )
}

export default InviteRequestModal