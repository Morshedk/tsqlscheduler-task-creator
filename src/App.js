import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./styles/App.out.css";

const schema = yup.object().shape({
  TaskUid: yup.string().required(),
  Identifier: yup.string().required(),
  TSQLCommand: yup.string().required()
});

const TextInput = ({ name, placeholder }) => {
  return (
    <label className="block mb-2">
      <span className="text-gray-700 font-semibold">{name}</span>
      <Field
        className="form-input mt-1 block w-full"
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-800 italic"
      />
    </label>
  );
};

const GuidInput = ({ name, placeholder }) => {
  return (
    <label className="block mb-2">
      <span className="text-gray-700 font-semibold">{name}</span>
      <Field
        className="form-input mt-1 block w-full"
        name={name}
        placeholder={placeholder}
      />
      <button
        className="mt-2 bg-gray-200 text-gray-800 hover:bg-gray-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={e => e.preventDefault()}
      >
        Generate TaskUid
      </button>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-800 italic"
      />
    </label>
  );
};

function App() {
  const [jsonTask, setJsonTask] = useState(null);

  return (
    <div>
      <header className="text-center text-4xl font-bold">
        tsqlScheduler Task Creator
      </header>
      <div className="max-w-xl mx-auto mt-2 px-4 py-2 bg-gray-100 shadow-xl">
        <Formik
          initialValues={{
            TaskUid: "",
            Identifier: "",
            TSQLCommand: "",
          }}
          validate={values => {
            const errors = {};
            return errors;
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            setJsonTask(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <GuidInput
                name="TaskUid"
                placeholder="00000000-0000-0000-0000-000000000000"
              />

              <TextInput name="Identifier" placeholder="Task name" />
              <TextInput
                name="TSQLCommand"
                placeholder="exec db.schema.proc;"
              />

              <button
                type="submit"
                className="my-2 bg-blue-400 text-white hover:bg-blue-600 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isSubmitting}
              >
                Create JSON
              </button>
            </Form>
          )}
        </Formik>
        {jsonTask && (
          <div className="mt-4">
            <textarea
              className="form-textarea block w-full mb-2"
              rows={5}
              value={jsonTask}
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
