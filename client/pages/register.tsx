import {
  FormControl,
  FormLabel,
  Button,
  Stack,
  Input,
  FormHelperText,
  Container,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Enter a valid username')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function Register() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch('http://localhost:3000/users', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        method: 'POST',
      }).then((res) => console.log(res.json()));
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container marginTop="16">
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="4">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.username && Boolean(formik.errors.username)
              }
            />
            <FormHelperText>
              {formik.touched.username && formik.errors.username}
            </FormHelperText>
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.password && Boolean(formik.errors.password)
              }
            />
            <FormHelperText>
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
          </FormControl>

          <Button type="submit" colorScheme="teal">
            Register
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
