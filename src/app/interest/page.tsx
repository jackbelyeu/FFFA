"use client";
import React from "react";
export default function Interest() {
  const [player, setPlayer] = React.useState({
    name: "",
    email: "",
    phone: "",
    sunday: "",
    team: "",
    position: "",
    field: "",
    opinion: "",
  });
  return (
    <div>
      <h1>Hello, Express Interest Page!</h1>
      <p>Express interest in the 2024 season.</p>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setPlayer({ ...player, name: e.target.value })}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setPlayer({ ...player, email: e.target.value })}
        />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          name="phone"
          onChange={(e) => setPlayer({ ...player, phone: e.target.value })}
        />
        <br />
        <label htmlFor="availability">
          Mark your Sunday afternoon availability:
          <br />
          <label>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="oct8"
            />{" "}
            October 8th
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="oct15"
            />{" "}
            October 15th
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="oct22"
            />{" "}
            October 22nd
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="oct29"
            />{" "}
            October 29th
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="nov5"
            />{" "}
            November 5th
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="nov12"
            />
            November 12th
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="nov19"
            />
            November 19th
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              id="availability"
              name="sunday"
              value="nov26"
            />
            November 26th
          </label>
        </label>
        <br />
        <label>
          Which team are you interested in?
          <br />
          <label htmlFor="chickens">
            <input type="radio" id="chickens" name="team" value="Chickens" />
            Chickens
          </label>
          <br />
          <label htmlFor="hyenas">
            <input type="radio" id="hyenas" name="team" value="Hyenas" /> Hyenas
          </label>
          <br />
          <label htmlFor="mosquitoes">
            <input
              type="radio"
              id="mosquitoes"
              name="team"
              value="Mosquitoes"
            />
            Mosquitoes
          </label>
          <br />
          <label htmlFor="emus">
            <input type="radio" id="emus" name="team" value="Emus" /> Emus
          </label>
          <br />
          <label htmlFor="mockingbirds">
            <input
              type="radio"
              id="mockingbirds"
              name="team"
              value="Mockingbirds"
            />
            Mockingbirds
          </label>
          <br />
          <label htmlFor="grasskickers">
            <input type="radio" id="grasskickers" name="team" value="team6" />
            Grasskickers
          </label>
        </label>
        <br />
        <label>
          What is your preferred position??
          <br />
          <label htmlFor="forward">
            <input type="radio" id="forward" name="position" value="forward" />
            Forward
          </label>
          <br />
          <label htmlFor="midfielder">
            <input
              type="radio"
              id="midfielder"
              name="position"
              value="midfielder"
            />
            Midfielder
          </label>
          <br />
          <label htmlFor="defender">
            <input
              type="radio"
              id="defender"
              name="position"
              value="defender"
            />
            Defender
          </label>
          <br />
          <label htmlFor="goalkeeper">
            <input
              type="radio"
              id="goalkeeper"
              name="position"
              value="goalkeeper"
            />
            Goalkeeper
          </label>
          <br />
          <label htmlFor="Too many to Specify">
            <input
              type="radio"
              id="Too many to Specify"
              name="position"
              value="Too many to Specify"
            />
            Too Many to Specify
          </label>
        </label>
        <br />
        <label htmlFor="fieldPreference">
          What kind of Field you prefer to play on ?
          <br />
          <label htmlFor="grass">
            <input type="radio" id="grass" name="field" value="grass" />{" "}
            Grass
          </label>
          <br />
          <label htmlFor="turf">
            <input type="radio" id="turf" name="field" value="turf" /> Turf
          </label>
          <br />
          <label htmlFor="nopref">
            <input type="radio" id="nopref" name="field" value="nopref" /> No
            Preference
          </label>
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
            onChange={(e) => setPlayer({ ...player, opinion: e.target.value })}
            name="opinion"
          />
        </label>
        <br />
        <button
          onClick={() => {
            console.log("Player", player);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
