"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Interest() {
  const [interested, setInterested] = useState({
    name: "",
    email: "",
    phone: "",
    sunday: [] as string[],
    team: "",
    position: "",
    field: "",
    opinion: "",
  });

  const router = useRouter();

  const sendEmail = () => {
    const emailAddress = "varangantipr@gmail.com";
    const subject = "Express Interest in 2024 Season";
    const body = "I am interested in the 2024 season";
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const { checked, value } = e.target;
    setInterested((prev) => ({
      ...prev,
      sunday: checked
        ? [...prev.sunday, value]
        : prev.sunday.filter((day) => day !== value),
    }));
  };

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interested),
      });
  
      if (response.ok) {
        router.push("/thankyou");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to submit the form. Please try again later.");
    }
  };

  const isFormValid =
    interested.sunday.length < 1 ||
    !interested.name ||
    !interested.email ||
    !interested.phone ||
    !interested.team ||
    !interested.position ||
    !interested.field ;

  return (
    <div>
      <h1>Hello, Express Interest Page!</h1>
      <p>Express interest in the 2024 season.</p>

      <button onClick={sendEmail}>Contact Organizer</button>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          onChange={(e) =>
            setInterested({ ...interested, name: e.target.value })
          }
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          onChange={(e) =>
            setInterested({ ...interested, email: e.target.value })
          }
        />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          onChange={(e) =>
            setInterested({ ...interested, phone: e.target.value })
          }
        />
        <br />
        <label htmlFor="availability">
          Mark your Sunday afternoon availability<small><small> (Select at least one Sunday)</small> </small>:
          <br />
          <span>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="oct8"
              onChange={handleChange}
            />{" "}
            October 8th
          </span>
          <br />
          <span>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="oct15"
              onChange={handleChange}
            />{" "}
            October 15th
          </span>
          <br />
          <span>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="oct22"
              onChange={handleChange}
            />{" "}
            October 22nd
          </span>
          <br />
          <span>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="oct29"
              onChange={handleChange}
            />{" "}
            October 29th
          </span>
          <br />
          <span>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="nov5"
              onChange={handleChange}
            />{" "}
            November 5th
          </span>
          <br />
          <span>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="nov12"
              onChange={handleChange}
            />{" "}
            November 12th
          </span>
          <br />
          <span>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="nov19"
              onChange={handleChange}
            />{" "}
            November 19th
          </span>
          <br />
          <span>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="nov26"
              onChange={handleChange}
            />{" "}
            November 26th
          </span>
        </label>
        <br />
        <label>
          Which team are you interested in?
          <br />
          <label htmlFor="chickens">
            <input
              type="radio"
              id="chickens"
              name="team"
              value="Chickens"
              onChange={(e) =>
                setInterested({ ...interested, team: e.target.value })
              }
              required
            />{" "}
            Chickens
          </label>
          <br />
          <label htmlFor="hyenas">
            <input
              type="radio"
              id="hyenas"
              name="team"
              value="Hyenas"
              onChange={(e) =>
                setInterested({ ...interested, team: e.target.value })
              }
              required
            />{" "}
            Hyenas
          </label>
          <br />
          <label htmlFor="mosquitoes">
            <input
              type="radio"
              id="mosquitoes"
              name="team"
              value="Mosquitoes"
              onChange={(e) =>
                setInterested({ ...interested, team: e.target.value })
              }
              required
            />{" "}
            Mosquitoes
          </label>
          <br />
          <label htmlFor="emus">
            <input
              type="radio"
              id="emus"
              name="team"
              value="Emus"
              onChange={(e) =>
                setInterested({ ...interested, team: e.target.value })
              }
              required
            />{" "}
            Emus
          </label>
          <br />
          <label htmlFor="mockingbirds">
            <input
              type="radio"
              id="mockingbirds"
              name="team"
              value="Mockingbirds"
              onChange={(e) =>
                setInterested({ ...interested, team: e.target.value })
              }
              required
            />{" "}
            Mockingbirds
          </label>
          <br />
          <label htmlFor="grasskickers">
            <input
              type="radio"
              id="grasskickers"
              name="team"
              value="team6"
              onChange={(e) =>
                setInterested({ ...interested, team: e.target.value })
              }
              required
            />{" "}
            Grasskickers
          </label>
        </label>
        <br />
        <label>
          What is your preferred position??
          <br />
          <span>
            <input
              type="radio"
              id="forward"
              name="position"
              value="forward"
              onChange={(e) =>
                setInterested({ ...interested, position: e.target.value })
              }
              required
            />{" "}
            Forward
          </span>
          <br />
          <span>
            <input
              type="radio"
              id="midfielder"
              name="position"
              value="midfielder"
              onChange={(e) =>
                setInterested({ ...interested, position: e.target.value })
              }
              required
            />{" "}
            Midfielder
          </span>
          <br />
          <span>
            <input
              type="radio"
              id="defender"
              name="position"
              value="defender"
              onChange={(e) =>
                setInterested({ ...interested, position: e.target.value })
              }
              required
            />{" "}
            Defender
          </span>
          <br />
          <span>
            <input
              type="radio"
              id="goalkeeper"
              name="position"
              value="goalkeeper"
              onChange={(e) =>
                setInterested({ ...interested, position: e.target.value })
              }
              required
            />{" "}
            Goalkeeper
          </span>
          <br />
          <span>
            <input
              type="radio"
              id="Too many to Specify"
              name="position"
              value="Too many to Specify"
              onChange={(e) =>
                setInterested({ ...interested, position: e.target.value })
              }
              required
            />{" "}
            Too Many to Specify
          </span>
        </label>
        <br />
        <label htmlFor="fieldPreference">
          What kind of Field you prefer to play on ?
          <br />
          <span>
            <input
              type="radio"
              id="grass"
              name="field"
              value="grass"
              onChange={(e) =>
                setInterested({ ...interested, field: e.target.value })
              }
              required
            />{" "}
            Grass
          </span>
          <br />
          <span>
            <input
              type="radio"
              id="turf"
              name="field"
              value="turf"
              onChange={(e) =>
                setInterested({ ...interested, field: e.target.value })
              }
              required
            />{" "}
            Turf
          </span>
          <br />
          <span>
            <input
              type="radio"
              id="nopref"
              name="field"
              value="nopref"
              onChange={(e) =>
                setInterested({ ...interested, field: e.target.value })
              }
              required
            />{" "}
            No Preference
          </span>
        </label>
        <br />
        <label>
          A space for your opinion
          <br />
          <textarea
            style={{
              width: "100%",
              height: "100px",
              backgroundColor: "lightgray",
            }}
            onChange={(e) =>
              setInterested({ ...interested, opinion: e.target.value })
            }
            required
            name="opinion"
          />
        </label>
        <br />
        <button type="submit" disabled={isFormValid}
        onClick={handleSubmit}
        >
          {isFormValid
            ? "Please fill all the fields to submit the form."
            : "Submit"}
        </button>
      </form>
    </div>
  );
}
