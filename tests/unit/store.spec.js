import mutations from "../../src/store/mutations";
describe('store', () => {
    it('очитска state.users', () => {
      const state = {
          users: [1, 2, 3]
      }

      mutations.clearUsers(state)
      expect(state.users.length).toBe(0)
    })
})
