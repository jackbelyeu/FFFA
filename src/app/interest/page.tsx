"use client";
import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Uncomment this line if you want to use the router
import Link from "next/link";
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

  // const router = useRouter();  // Uncomment this line if you want to use the router

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
        // router.push("/thankyou"); // Uncomment this line if you want to use the router
        alert("Form submitted successfully");
        window.location.reload();
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
    !interested.field;

  return (
    <div>
      <Link href="/Schedule"> Match Schedule</Link>
      <h1>Express Your Interest for Season 2024!</h1>
      <p>
        The role of this form is to collect info on how many people would like
        to play in a randomized league, such that we can generate new totally
        random teams. Please fill out this form ONLY if you are planning to
        participate in the majority of this 4-week trial (assuming you are in
        town and available at time of the game). Expected to run mid-October
        through mid-November.
      </p>

      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={(e) =>
              setInterested({ ...interested, name: e.target.value })
            }
          />
          {interested.name === "" && <span style={{ color: "red" }}> *</span>}
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={(e) =>
              setInterested({ ...interested, email: e.target.value })
            }
          />
          {interested.email === "" && <span style={{ color: "red" }}>*</span>}
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            onChange={(e) =>
              setInterested({ ...interested, phone: e.target.value })
            }
          />
          {interested.phone === "" && <span style={{ color: "red" }}> *</span>}
        </label>
        <br />
        <label>
          Mark your Sunday afternoon availability{" "}
          <small>(Select at least one Sunday)</small> :
          {interested.sunday.length < 1 && (
            <span style={{ color: "red" }}> *</span>
          )}
        </label>

        <br />
        <label>
          <input
            type="checkbox"
            id="availability"
            name="sunday"
            value="October 8th"
            onChange={handleChange}
          />{" "}
          October 8th
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            id="availability"
            name="sunday"
            value="October 15th"
            onChange={handleChange}
          />{" "}
          October 15th
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            id="availability"
            name="sunday"
            value="October 22nd"
            onChange={handleChange}
          />{" "}
          October 22nd
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            id="availability"
            name="sunday"
            value="October 29th"
            onChange={handleChange}
          />{" "}
          October 29th
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            id="availability"
            name="sunday"
            value="November 5th"
            onChange={handleChange}
          />{" "}
          November 5th
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            id="availability"
            name="sunday"
            value="November 12th"
            onChange={handleChange}
          />{" "}
          November 12th
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            id="availability"
            name="sunday"
            value="November 19th"
            onChange={handleChange}
          />{" "}
          November 19th
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            id="availability"
            name="sunday"
            value="November 26th"
            onChange={handleChange}
          />{" "}
          November 26th
        </label>
        <br />
        <label>
          Which team are you interested in?
          {interested.team === "" && <span style={{ color: "red" }}> *</span>}
        </label>
        <br />
        <label>
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
        <label>
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
        <label>
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
        <label>
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
        <label>
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
        <label>
          <input
            type="radio"
            id="grasskickers"
            name="team"
            value="Grasskickers"
            onChange={(e) =>
              setInterested({ ...interested, team: e.target.value })
            }
            required
          />{" "}
          Grasskickers
        </label>
        <br />
        <label>
          What is your preferred position??
          {interested.position === "" && (
            <span style={{ color: "red" }}> *</span>
          )}
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="forward"
            name="position"
            value="Forward"
            onChange={(e) =>
              setInterested({ ...interested, position: e.target.value })
            }
            required
          />{" "}
          Forward
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="midfielder"
            name="position"
            value="Midfielder"
            onChange={(e) =>
              setInterested({ ...interested, position: e.target.value })
            }
            required
          />{" "}
          Midfielder
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="defender"
            name="position"
            value="Defender"
            onChange={(e) =>
              setInterested({ ...interested, position: e.target.value })
            }
            required
          />{" "}
          Defender
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="goalkeeper"
            name="position"
            value="Goalkeeper"
            onChange={(e) =>
              setInterested({ ...interested, position: e.target.value })
            }
            required
          />{" "}
          Goalkeeper
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="Too many to Specify"
            name="position"
            value="Too Many to Specify"
            onChange={(e) =>
              setInterested({ ...interested, position: e.target.value })
            }
            required
          />{" "}
          Too Many to Specify
        </label>
        <br />
        <label>
          What kind of Field you prefer to play on ?
          {interested.field === "" && <span style={{ color: "red" }}> *</span>}
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="grass"
            name="field"
            value="Grass"
            onChange={(e) =>
              setInterested({ ...interested, field: e.target.value })
            }
            required
          />{" "}
          Grass
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="turf"
            name="field"
            value="Turf"
            onChange={(e) =>
              setInterested({ ...interested, field: e.target.value })
            }
            required
          />{" "}
          Turf
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="nopref"
            name="field"
            value="No Preference"
            onChange={(e) =>
              setInterested({ ...interested, field: e.target.value })
            }
            required
          />{" "}
          No Preference
        </label>
        <br />
        <label>
          A space for your opinion
          <br />
          <br />
          <textarea
            style={{
              paddingLeft: "10px",
              width: "100%",
              height: "100px",
              borderRadius: "5px",
              color: "black",
              fontSize: "20px",
              fontFamily: "Arial",
            }}
            onChange={(e) =>
              setInterested({ ...interested, opinion: e.target.value })
            }
            required
            name="opinion"
          />
        </label>
        <br />
        <button type="submit" disabled={isFormValid} onClick={handleSubmit}>
          {isFormValid
            ? "Please fill all the fields to submit the form."
            : "Submit"}
        </button>
      </form>
    </div>
  );
}
