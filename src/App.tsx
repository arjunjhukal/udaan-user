import { useAppSelector } from "./store/hook";

export default function App() {

  const user = useAppSelector((state) => state.auth.user);

  return (
    <h1>Welcome {user?.name}</h1>
  )
}
