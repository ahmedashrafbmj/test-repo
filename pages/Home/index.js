import Head from "next/head";
import { useState, useCallback, useEffect } from "react";
import TextInput from "../components/TextInput";
import Editor from "../components/Editor";
import Hero from "../components/Header";

export default function Home() {
  const [result, setResult] = useState(
    "// type a text prompt above and click 'Audit My Smart Contract'"
  );
  const [textInput, setTextInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [selVal, setSelVal] = useState("Audit My Smart Contract");

  const egArray = [];

  function textInputChange(event) {
    event.preventDefault();
    setTextInput(event.target.value);
  }

  async function textInputSubmit(event) {
    event.preventDefault();
    setWaiting(true);
    setResult("// Please be patient, this may take a while...");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_API_URL || ""}/api/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: textInput, value: selVal }),
        }
      );

      const data = await response.json();
      if (response.status !== 200) {
        setWaiting(false);
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data.code);
      setWaiting(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
      setWaiting(false);
    }
  }

  const editorChange = useCallback((value, viewUpdate) => {
    setResult(value);
  }, []);

  function textSelectChange(event) {
    setSelVal(event.target.value);
    /* event.preventDefault();
    const search = event.target.value;
    const selectedEg = egArray.find((obj) => obj.value === search);
    if (selectedEg) {
      setTextInput(selectedEg.prompt);
      setResult(selectedEg.code);
    } else {
      setTextInput("");
      setResult("");
    } */
  }

  return (
    <>
      <Hero />
      <div className="smartContract w-full p-5 flex flex-col gap-5 max-w-2xl min-w-[320px] relative 2xl:max-w-7xl">
        <div className="flex flex-col gap-4 2xl:flex-row w-full">
          <div className="flex flex-col gap-4 2xl:w-1/2">
            <TextInput
              key="textinput-01"
              textInput={textInput}
              onChange={textInputChange}
              onSubmit={textInputSubmit}
              waiting={waiting}
              selectVal={selVal}
              selectChange={textSelectChange}
              egArray={egArray}
            />
            <Editor
              key="editor-01"
              result={result}
              onChange={editorChange}
              waiting={waiting}
              selValue={selVal}
            />
          </div>

          <div className="flex flex-col gap-4 2xl:w-1/2"></div>
        </div>
        <p className="text-gray-400 text-sm text-center mt-3">
          Made by{" "}
          <a
            href="https://github.com/RizanKhan837"
            target="_blank"
            className="underline"
          >
            Rizwan Akram & Abdul Hannan
          </a>
        </p>
      </div>
    </>
  );
}
