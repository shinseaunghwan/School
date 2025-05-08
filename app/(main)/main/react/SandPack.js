import { Sandpack } from "@codesandbox/sandpack-react"
import sub from "../../../../styles/sub.module.css";
import { githubLight } from "@codesandbox/sandpack-themes";

const CodeSandPack = ({ code, code2, code3, code4 }) => {
  const files = {
    "/App.js": {
      code: code,
    },
    "/data1.js": {
      code: code2,
    },
    "/data2.js": {
      code: code3,
    },
    "/data3.js": {
      code: code4,
    },
  }
  
  return (
    <div className={sub.codePack}>
      <Sandpack
        files={files} 
        theme={githubLight}
        template="react"
        options={{
          showNavigator: true,
        }}
      >
      </Sandpack>
    </div>
  )  
}
export default CodeSandPack;