import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InviteRequestModal from './InviteRequestModal';
import { apiURL, mockServer, rest } from '../../../test/mock-server';
import { act } from 'react-dom/test-utils';


describe('InviteRequestModal',  () => {
    const onRequestSuccess = vi.fn()
    
    beforeEach(() => {
      render(<InviteRequestModal onRequestSuccess={onRequestSuccess} />)
    })
    
    it('calls success callback', async () => {
      const fullNameInput = screen.getByTestId('full-name-input')
      fireEvent.change(fullNameInput, { target: { value: 'baptiste'}})

      const emailInput = screen.getByTestId('email-input')
      fireEvent.change(emailInput, { target: { value: 'bvi@test.com' } })

      const emailConfirmationInput = screen.getByTestId('email-confirmation-input')
      fireEvent.change(emailConfirmationInput, { target: { value: 'bvi@test.com' } })

      await act(() => {
        userEvent.click(screen.getByTestId('submit-request-button'))
      })

      await waitFor(() => expect(screen.getByText('Sending, please wait...')).toBeDefined())
      await waitFor(() => expect(onRequestSuccess).toHaveBeenCalled())
    })

    it('displays server error message if any', async () => {
      const fullNameInput = screen.getByTestId('full-name-input')
      fireEvent.change(fullNameInput, { target: { value: 'baptiste'}})

      const emailInput = screen.getByTestId('email-input')
      fireEvent.change(emailInput, { target: { value: 'bvi@test.com' } })

      const emailConfirmationInput = screen.getByTestId('email-confirmation-input')
      fireEvent.change(emailConfirmationInput, { target: { value: 'bvi@test.com' } })

      mockServer.use(
        rest.post(apiURL('/fakeAuth'), (_, res, ctx) => {
          return res(ctx.status(400), ctx.json({ errorMessage: 'test error message' }))
        })
      )

      await act(() => {
        userEvent.click(screen.getByTestId('submit-request-button'))
      })

      await waitFor(() => expect(screen.getByText('test error message')).toBeDefined())
    })

    it('displays validation error if required fields missing', async () => {
      await act(() => {
        userEvent.click(screen.getByTestId('submit-request-button'))
      })

      await waitFor(() => expect(screen.getByText('Full name is a required field')).toBeDefined())
      await waitFor(() => expect(screen.getByText('Email is a required field')).toBeDefined())
      await waitFor(() => expect(screen.getByText('Confirm email is a required field')).toBeDefined())
    })

    it('displays validation error if full name is too short', async () => {
      const fullNameInput = screen.getByTestId('full-name-input')
      fireEvent.change(fullNameInput, { target: { value: 'bv'}})
      
      const emailInput = screen.getByTestId('email-input')
      fireEvent.change(emailInput, { target: { value: 'bvi@test.com' } })

      const emailConfirmationInput = screen.getByTestId('email-confirmation-input')
      fireEvent.change(emailConfirmationInput, { target: { value: 'bvi@test.com' } })

      await act(() => {
        userEvent.click(screen.getByTestId('submit-request-button'))
      })

      await waitFor(() => expect(screen.getByText('Full name must be at least 3 characters')).toBeDefined())
    })

    it('displays validation error if email confirmation does not match', async () => {
      const fullNameInput = screen.getByTestId('full-name-input')
      fireEvent.change(fullNameInput, { target: { value: 'baptiste'}})
      
      const emailInput = screen.getByTestId('email-input')
      fireEvent.change(emailInput, { target: { value: 'bvi@test.com' } })

      const emailConfirmationInput = screen.getByTestId('email-confirmation-input')
      fireEvent.change(emailConfirmationInput, { target: { value: 'bvia@test.com' } })

      await act(() => {
        userEvent.click(screen.getByTestId('submit-request-button'))
      })

      await waitFor(() => expect(screen.getByText('Email does not match')).toBeDefined())
    })
})