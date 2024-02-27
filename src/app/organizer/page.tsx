"use client";
import { useForm } from "@formspree/react";
import OrganizerLayout from "../layout";
import SecurityKeyForm from "../organizer/components/SecurityKeyForm";

const Page = () => {
  const [state, handleSubmit] = useForm("xgegyaqw");

  // Add a console.log here to debug the state after submission
  console.log(state);

  if (state.succeeded) {
    return (
      <OrganizerLayout>
        <p>Edit the scoreboard</p>
      </OrganizerLayout>
    );
  }

  return (
    <OrganizerLayout>
      <SecurityKeyForm onSubmit={handleSubmit} />
    </OrganizerLayout>
  );
};

export default Page;
