import {describe, expect, it, vi} from 'vitest';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InviteRequestModal from './InviteRequestModal';


describe('InviteRequestModal',  () => {
    it('calls success callback', async () => {
      const onRequestSuccess = vi.fn()
      render(<InviteRequestModal onRequestSuccess={onRequestSuccess} />, { wrapper:  ({ children }) => children})
    
      const fullNameInput = screen.getByTestId('full-name-input')
      fireEvent.change(fullNameInput, { target: { value: 'baptiste'}})

      const emailInput = screen.getByTestId('email-input')
      fireEvent.change(emailInput, { target: { value: 'bvi@test.com' } })

      const emailConfirmationInput = screen.getByTestId('email-confirmation-input')
      fireEvent.change(emailConfirmationInput, { target: { value: 'bvi@test.com' } })

      userEvent.click(screen.getByTestId('submit-request-button'))

      await waitFor(() => expect(onRequestSuccess).toHaveBeenCalled())
    })
})