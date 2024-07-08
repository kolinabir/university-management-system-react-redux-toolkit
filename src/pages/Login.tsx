import { useForm, Controller, FieldValues } from "react-hook-form";
import { Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const { Title } = Typography;

const verifyToken = (token: string) => {
  return jwtDecode(token);
};

const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });

  const dispatch = useAppDispatch();

  const [login ] = useLoginMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(
        setUser({
          user: user,
          token: res.data.accessToken,
        })
      );
      navigate(`/${user.role}/dashboard`);
      toast.success("Logged In", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "50px auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Login
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="id"
          control={control}
          rules={{ required: "ID is required" }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<UserOutlined />}
              placeholder="ID"
              style={{ marginBottom: 16 }}
            />
          )}
        />
        {errors.id && (
          <p style={{ color: "red", marginTop: -8, marginBottom: 8 }}>
            {errors.id.message}
          </p>
        )}

        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <Input.Password
              {...field}
              prefix={<LockOutlined />}
              placeholder="Password"
              style={{ marginBottom: 16 }}
            />
          )}
        />
        {errors.password && (
          <p style={{ color: "red", marginTop: -8, marginBottom: 8 }}>
            {errors.password.message}
          </p>
        )}

        <Button type="primary" htmlType="submit" block>
          Log in
        </Button>
      </form>
    </Card>
  );
};

export default Login;
