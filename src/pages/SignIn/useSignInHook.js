import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCartForUser } from "../../redux/slices/CartSlice";
import { LogUserInStore } from "../../redux/slices/UserSlice";

function useSignInHook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state?.user?.email);
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });

  const [Error, setError] = useState({});

  const ValidateForm = () => {
    if (formData["email"] === "" || formData["password"] === "") {
      console.log(formData);
      setError((state) => {
        return {
          ...state,
          incompleteForm:
            "All Fields are mandatory.It seems you have some fields not filled",
        };
      });
    }
  };
  const HandleFormData = async (e) => {
    e.preventDefault();
    setError({});
    ValidateForm();

    if (Object.keys(Error).length === 0) {
      try {
        await dispatch(LogUserInStore(formData));
        toast.success("You are logged in successfully");
        navigate("/");
        dispatch(getCartForUser(formData["email"]));
      } catch (e) {
        toast.error(e.message);
      }
    }
  };
  useEffect(() => {
    const mail = localStorage.getItem("email");
    if (email || mail) {
      navigate("/");
    }
  }, [email, navigate]);

  return {
    formData,
    SetFormData,
    HandleFormData,
    Error,
  };
}

export default useSignInHook;
