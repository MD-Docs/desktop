import { ErrorCodes } from '@enums/ErrorCodes';

interface ErrorParam {
    code: ErrorCodes;
    error: unknown;
}

interface OutputType {
    code: ErrorCodes;
    msg: string;
    trace: string;
}

export const handleException = ({ code, error }: ErrorParam) => {
    const trace = new Error().stack?.split('\n')[2];

    const output: OutputType = { code, msg: '', trace: '' };

    if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message == 'string') {
        output.msg = error.message;
    }

    output.trace = trace || 'No trace...';

    try {
        (async () => {
            await fetch('http://localhost:5000/logs/error', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ message: output }),
            });
        })();
    } catch (err) {
        console.log(err);
    }
};
