
import React from 'react';

export const InfoPanel: React.FC = () => {
    return (
        <div className="bg-gray-800/50 border border-indigo-500/30 rounded-lg p-6 mb-8 text-sm text-gray-400 space-y-3">
            <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                About This Application
            </h3>
            <p>
                This application <strong className="text-gray-200">simulates</strong> the process of creating Kubernetes pods to execute shell commands. It acts as a frontend interface for a conceptual backend that would interact with the Kubernetes API.
            </p>
            <p>
                The pod lifecycle (Pending → Running → Succeeded) is mocked on the client-side for demonstration purposes. To deploy this for real, you would need a backend service to securely communicate with your cluster.
            </p>
            <p>
                You can find the necessary <code className="bg-gray-700 text-xs p-1 rounded">Dockerfile</code> and Kubernetes <code className="bg-gray-700 text-xs p-1 rounded">.yaml</code> manifests in the <strong className="text-gray-200">"Deployment Files"</strong> tab.
            </p>
        </div>
    )
}
