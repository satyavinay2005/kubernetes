
import React, { useState } from 'react';
import {
  DOCKERFILE_CONTENT,
  APP_DEPLOYMENT_YAML,
  APP_SERVICE_YAML,
  MONGO_STATEFULSET_YAML,
  MONGO_SERVICE_YAML
} from '../constants';

type FileType = 'Dockerfile' | 'App Deployment' | 'App Service' | 'Mongo StatefulSet' | 'Mongo Service';

const fileContents: Record<FileType, string> = {
  'Dockerfile': DOCKERFILE_CONTENT,
  'App Deployment': APP_DEPLOYMENT_YAML,
  'App Service': APP_SERVICE_YAML,
  'Mongo StatefulSet': MONGO_STATEFULSET_YAML,
  'Mongo Service': MONGO_SERVICE_YAML,
};

const CodeBlock: React.FC<{ content: string }> = ({ content }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative">
            <button 
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white text-xs font-bold py-1 px-2 rounded transition-all"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
            <pre className="bg-black/50 p-4 rounded-b-lg overflow-x-auto">
                <code className="text-sm text-gray-300 whitespace-pre">
                    {content.trim()}
                </code>
            </pre>
        </div>
    );
};


export const DeploymentFilesViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FileType>('Dockerfile');

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-400">Deployment Manifests</h2>
      <p className="text-gray-400 mb-6">
        Here are the necessary files to containerize and deploy this application and a MongoDB instance to a Kubernetes cluster.
      </p>
      <div className="flex border-b border-gray-700">
        {Object.keys(fileContents).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as FileType)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 -mb-px border-b-2
              ${activeTab === tab ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-0">
         <CodeBlock content={fileContents[activeTab]} />
      </div>
    </div>
  );
};
