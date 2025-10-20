
import React, { useState } from 'react';

const KUBECTL_GET_PODS_OUTPUT = `
NAME                                     READY   STATUS    RESTARTS   AGE
k8s-task-runner-app-6f7c5d9c8b-abcde    1/1     Running   0          5m12s
k8s-task-runner-app-6f7c5d9c8b-fghij    1/1     Running   0          5m10s
mongodb-0                                1/1     Running   0          15m
`.trim();

const KUBECTL_GET_SVC_OUTPUT = `
NAME                        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
k8s-task-runner-service   NodePort    10.108.111.222  <none>        80:30080/TCP   12m
kubernetes                  ClusterIP   10.96.0.1       <none>        443/TCP        2h
mongodb-service             ClusterIP   None            <none>        27017/TCP      15m
`.trim();

const CURL_OUTPUT = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Kubernetes Task Runner</title>
  </head>
  <body>
    <!-- Application content -->
    <h1>Welcome to the Kubernetes Task Runner!</h1>
    <p>Your application is running successfully.</p>
  </body>
</html>
`.trim();


type Command = 'kubectl get pods' | 'kubectl get svc' | 'curl';

const commandOutputs: Record<Command, { title: string; cmd: string; output: string }> = {
    'kubectl get pods': {
        title: 'List Running Pods',
        cmd: 'kubectl get pods',
        output: KUBECTL_GET_PODS_OUTPUT,
    },
    'kubectl get svc': {
        title: 'List Services',
        cmd: 'kubectl get svc',
        output: KUBECTL_GET_SVC_OUTPUT,
    },
    'curl': {
        title: 'Access Application Endpoint',
        cmd: 'curl http://<NODE_IP>:30080',
        output: CURL_OUTPUT
    }
}

const TerminalOutput: React.FC<{ command: string; output: string }> = ({ command, output }) => (
    <div className="bg-black/80 rounded-lg overflow-hidden shadow-lg">
        <div className="bg-gray-700 px-4 py-2 flex items-center gap-2">
            <span className="h-3 w-3 bg-red-500 rounded-full"></span>
            <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
            <span className="h-3 w-3 bg-green-500 rounded-full"></span>
        </div>
        <div className="p-4">
            <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-green-400">user@host:~$</span>
                <span className="text-gray-300">{command}</span>
            </div>
            <pre className="text-gray-400 text-xs whitespace-pre-wrap font-mono mt-2">{output}</pre>
        </div>
    </div>
);


export const KubectlSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Command>('kubectl get pods');

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-2 text-indigo-400">Verification with kubectl</h2>
      <p className="text-gray-400 mb-6">
        After applying the manifests to your cluster, you can use these commands to verify the deployment status and access the application. Below are examples of the expected output.
      </p>

      <div className="flex border-b border-gray-700 mb-6">
        {Object.values(commandOutputs).map((cmd, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(Object.keys(commandOutputs)[index] as Command)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 -mb-px border-b-2
              ${activeTab === Object.keys(commandOutputs)[index] ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'}`}
          >
            {cmd.title}
          </button>
        ))}
      </div>
      
      <div>
        <TerminalOutput 
            command={commandOutputs[activeTab].cmd}
            output={commandOutputs[activeTab].output}
        />
      </div>
    </div>
  );
};
