import create from "zustand"

const useStore = create(set => ({
    authenticated: false,
    authorize: (value) => 
        set(state => ({ authenticated: value }))
}))

export default useStore