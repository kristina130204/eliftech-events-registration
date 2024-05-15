import { Formik, Form, Field } from "formik";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { instance } from "../axios";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  dateOfBirth: Yup.date().required("Required"),
  whereDidYouHearFrom: Yup.string().required("Required"),
});

const EventRegistration = () => {
  const params = useParams();
  const id = params.id;
  const submitForm = async (data) => {
    try {
      const res = await instance.put(`${id}`, data);
      toast.success(res.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <div className='container'>
      <div className='register'>
        <Link className='go-back' to='/'>
          Go back to events
        </Link>
        <h1>Event registration</h1>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            dateOfBirth: "",
            whereDidYouHearFrom: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            submitForm(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='formInput'>
                <label htmlFor='fullname'>Full name</label>
                <Field name='fullName' id='fullname' />
                {errors.fullName && touched.fullName ? (
                  <div className='error'>{errors.fullName}</div>
                ) : null}
              </div>
              <div className='formInput'>
                <label htmlFor='email'>Email</label>
                <Field name='email' type='email' id='email' />
                {errors.email && touched.email ? (
                  <div className='error'>{errors.email}</div>
                ) : null}
              </div>
              <div className='formInput'>
                <label htmlFor='dateOfBirth'>Date of birth</label>
                <Field name='dateOfBirth' type='date' id='dateOfBirth' />
                {errors.dateOfBirth && touched.dateOfBirth ? (
                  <div className='error'>{errors.dateOfBirth}</div>
                ) : null}
              </div>
              <div>Where did you hear about this event?</div>
              <div className='formInputGroup'>
                <div>
                  <Field
                    name='whereDidYouHearFrom'
                    id='social'
                    type='radio'
                    value='Social media'
                  />
                  <label htmlFor='social'>Social media</label>
                </div>
                <div>
                  <Field
                    name='whereDidYouHearFrom'
                    id='friends'
                    type='radio'
                    value='Friends'
                  />
                  <label htmlFor='friends'>Friends</label>
                </div>
                <div>
                  <Field
                    name='whereDidYouHearFrom'
                    id='myself'
                    type='radio'
                    value='Myself'
                  />
                  <label htmlFor='myself'>Found by myself</label>
                </div>
                {errors.whereDidYouHearFrom && touched.whereDidYouHearFrom ? (
                  <div className='error'>{errors.whereDidYouHearFrom}</div>
                ) : null}
              </div>
              <button type='submit' className='btn primary'>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EventRegistration;
