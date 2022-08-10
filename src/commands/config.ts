import { Command } from '../types/Command';
import {
    getServiceAccountPathWithUserInput,
    getServiceAccountWithConfigOrUserInput,
    isValidServiceAccountPath,
    validateAndParseServiceAccountPath,
} from '../utils/serviceAccountTools';
import { setDefaultServiceAccountPath } from '../utils/configTools';
import * as chalk from 'chalk';
import { logSuccess } from '../utils/promptTools';

export const config: Command = {
    name: 'config',
    description: 'Edit firebase-cli config',
    arguments: [],
    options: [
        {
            name: 'default-service-account-path',
            argName: 'defaultServiceAccountPath',
            short: 's',
            info: 'Set path to the default service account used to access the project',
        },
    ],
    action: configAction,
};

type configOptions = {
    defaultServiceAccountPath?: string;
};

async function configAction(options?: configOptions): Promise<void> {
    let serviceAccountPath = (await isValidServiceAccountPath(
        options?.defaultServiceAccountPath,
        true
    ))
        ? options!.defaultServiceAccountPath!
        : await getServiceAccountPathWithUserInput();

    setDefaultServiceAccountPath(serviceAccountPath);
    logSuccess(`Succesfully setted ${serviceAccountPath} as default service account path.`);
}
