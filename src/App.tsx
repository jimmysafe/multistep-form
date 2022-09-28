import Input from "./components/form/Input";
import Radio from "./components/form/Radio";
import { IStep } from "./components/form/Step";
import MultiStepForm from "./MultiStepForm";

export type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  contribution: string;
  partitaIva: string;
  city: string;
};

function App() {
  const steps: IStep<FormData>[] = [
    {
      title: "title",
      description: "description",
      fields: [
        (props) => (
          <Input
            name="firstName"
            label="First Name"
            validate={{ required: { message: "Required Field", value: true } }}
            {...props}
          />
        ),
        (props) => <Input name="lastName" label="Last Name" {...props} />,
      ],
    },
    {
      title: "",
      description: "desc",
      fields: [
        (props) => (
          <section>
            {/* Radios */}
            <div>
              <Radio
                label="Yes"
                name="contribution"
                value={"yes"}
                validate={{
                  required: { message: "Required Field", value: true },
                }}
                {...props}
              />
              <Radio
                label="No"
                name="contribution"
                value={"no"}
                validate={{
                  required: { message: "Required Field", value: true },
                }}
                {...props}
              />
            </div>

            {props.watch("contribution") === "yes" && (
              <Input
                name="partitaIva"
                label="Partita Iva"
                validate={{ required: { message: "required", value: true } }}
                {...props}
              />
            )}
          </section>
        ),
      ],
    },
    {
      title: "title",
      description: "description",
      fields: [
        (props) => <Input name="address" label="Address" {...props} />,
        (props) => <Input name="city" label="City" {...props} />,
      ],
    },
  ];

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center w-screen">
      <MultiStepForm steps={steps} />
    </main>
  );
}

export default App;
