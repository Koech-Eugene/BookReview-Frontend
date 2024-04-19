import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Post() {
  const initialValues = {
    title: "",
    author: "",
    genre: "",
    description: "",
    image: "",
    star_rating: "",
    liked: false,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    genre: Yup.string().required("Genre is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().required("Image URL is required"),
    star_rating: Yup.number()
      .min(1, "Star rating must be at least 1")
      .max(5, "Star rating cannot exceed 5")
      .required("Star rating is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Reset the form fields after successful submission
      resetForm();

      // Optionally, you can set submitting to false to enable the submit button again
      // setSubmitting(false);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);

      // Optionally, you can set submitting to false to enable the submit button again
      // setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-28 mb-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Field
              type="text"
              name="title"
              className="mt-1 p-2 border rounded-md w-full"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <Field
              type="text"
              name="author"
              className="mt-1 p-2 border rounded-md w-full"
            />
            <ErrorMessage name="author" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
              Genre
            </label>
            <Field
              type="text"
              name="genre"
              className="mt-1 p-2 border rounded-md w-full"
            />
            <ErrorMessage name="genre" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              className="mt-1 p-2 border rounded-md w-full"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <Field
              type="text"
              name="image"
              className="mt-1 p-2 border rounded-md w-full"
            />
            <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="star_rating" className="block text-sm font-medium text-gray-700">
              Star Rating
            </label>
            <Field
              type="number"
              name="star_rating"
              className="mt-1 p-2 border rounded-md w-full"
            />
            <ErrorMessage name="star_rating" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Post;
