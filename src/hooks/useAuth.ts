import { RootStateOrAny, useSelector } from "react-redux"

const useAuth = () => {
    const authState = useSelector((state: RootStateOrAny) => state.auth)
    return authState
}

export default useAuth