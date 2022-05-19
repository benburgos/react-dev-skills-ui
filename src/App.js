import React, { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const [state, setState] = useState({
    skills: [{ skill: 'JavaScript', level: 4 }],
    newSkill: {
      skill: '',
      level: '3',
    },
  });

  useEffect(() => {
    async function getAppData() {
      try {
        // fetch the data and conver json to js
        let skills = await fetch('http://localhost:3001/api/skills').then(
          (res) => res.json()
        );
        // set the state to the data
        setState({
          ...state,
          skills,
        });
      } catch (err) {
        console.log(err);
      }
    }
    getAppData();
  }, []);

  function addSkill(evt) {
    evt.preventDefault();
    setState({
      skills: [...state.skills, state.newSkill],
      newSkill: {
        skill: '',
        level: '3',
      },
    });
  }

  function handleChange(evt) {
    setState({
      ...state,
      newSkill: {
        ...state.newSkill,
        [evt.target.name]: evt.target.value,
      },
    });
  }

  return (
    <section>
      <h2>DEV SKILLS</h2>
      <hr />
      {state.skills.map((s) => (
        <article key={s.skill}>
          <div>{s.skill}</div> <div>{s.level}</div>
        </article>
      ))}
      <hr />
      <form onSubmit={addSkill}>
        <label>
          <span>SKILL</span>
          <input
            name="skill"
            value={state.newSkill.skill}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>LEVEL</span>
          <select
            name="level"
            value={state.newSkill.level}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button>ADD SKILL</button>
      </form>
    </section>
  );
}
