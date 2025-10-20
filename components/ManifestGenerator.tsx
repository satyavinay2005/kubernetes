
import React, { useState } from 'react';
import { generatePodManifest } from '../services/geminiService';

export const ManifestGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('a simple nginx pod exposed on port 80');
  const [generatedYaml, setGeneratedYaml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedYaml('');
    try {
      const yaml = await generatePodManifest(prompt);
      setGeneratedYaml(yaml);
    } catch (e) {
      setError('Failed to generate manifest. Please ensure your API key is configured correctly.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    if(!generatedYaml) return;
    navigator.clipboard.writeText(generatedYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-2 text-indigo-400">Gemini-Powered Pod Manifest Generator</h2>
      <p className="text-gray-400 mb-6">Describe the pod you want to create, and Gemini will generate the YAML manifest for you.</p>
      
      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., a busybox pod that runs 'echo Hello' and then terminates"
          className="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 text-gray-200"
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
             'Generate Manifest'
          )}
        </button>
      </div>

      {error && <p className="mt-4 text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</p>}

      {generatedYaml && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Generated YAML</h3>
          <div className="relative">
              <button 
                  onClick={handleCopy}
                  className="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white text-xs font-bold py-1 px-2 rounded transition-all"
              >
                  {copied ? 'Copied!' : 'Copy'}
              </button>
              <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm text-gray-300 whitespace-pre">
                      {generatedYaml}
                  </code>
              </pre>
          </div>
        </div>
      )}
    </div>
  );
};
