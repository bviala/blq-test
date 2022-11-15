// test/server.js
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const apiURL = (path: string) => process.env.VITE_API_BASE_URL + path

const handlers = [
    rest.post(apiURL('/fakeAuth'), async (req, res, ctx) => {
        return res(ctx.body('Registered'))
    })
]

const mockServer = setupServer(...handlers)
export {mockServer, rest, apiURL}