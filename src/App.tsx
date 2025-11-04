import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CAN from './routes/CAN';
import { setLanguage } from './slice/themeSlice';
import { useAppDispatch } from './store/hook';
export default function App() {

  const dispatch = useAppDispatch();
  const { t } = useTranslation();


  return (

    <>
      <button onClick={() => {
        (dispatch(setLanguage("en")))
      }}>English</button>
      <button onClick={() => {
        (dispatch(setLanguage("np")))
      }}>Nepali</button>
      <Link to="/">{t("menus.dashboard")}</Link>
      <CAN permissions={["create_user", "edit_user", "delete_user", "view_user"]}>
        <Link to="/">User</Link>
        <CAN permissions={["create_user"]}>
          <Link to="/">Create User</Link>
        </CAN>
        <CAN permissions={["edit_user"]}>
          <Link to="/">Edit User</Link>
        </CAN>
        <CAN permissions={["delete_user"]}>
          <Link to="/">Delete User</Link>
        </CAN>
        <CAN permissions={["view_user"]}>
          <Link to="/">view User</Link>
        </CAN>
      </CAN >
      <CAN permissions={["create_role", "edit_role", "delete_role", "view_role"]} >
        <Link to="/">Role</Link>
        <CAN permissions={["create_role"]} >
          <Link to="/">Create Role</Link>
        </CAN>
        <CAN permissions={["edit_role"]} >
          <Link to="/">Edit Role</Link>
        </CAN>
        <CAN permissions={["delete_role"]} >
          <Link to="/">Delete Role</Link>
        </CAN>
        <CAN permissions={["view_role"]} >
          <Link to="/">View Role</Link>
        </CAN>
      </CAN>

      <CAN permissions={["create_course", "edit_course", "delete_course", "view_course"]} >
        <Link to="/">Course</Link>
        <CAN permissions={["create_course"]} >
          <Link to="/">Create Course</Link>
        </CAN>
        <CAN permissions={["edit_course"]} >
          <Link to="/">Edit Course</Link>
        </CAN>
        <CAN permissions={["delete_course"]} >
          <Link to="/">Delete Course</Link>
        </CAN>
        <CAN permissions={["view_course"]} >
          <Link to="/">View Course</Link>
        </CAN>
      </CAN>

    </>

  )
}
