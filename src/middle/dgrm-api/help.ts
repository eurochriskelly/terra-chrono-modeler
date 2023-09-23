const topLevelHelp = () => {
    console.log('The following commands are available:')
    console.log('  features')
    console.log('  collections')
    console.log('  help')
    console.log('  exit')
    console.log(' For more information on a specific command, type \'help <command>\'')
}

export const commandHelp = (parts: String[]) => {
    if (parts.length === 1) {
        topLevelHelp()
        return
    }

    switch (parts[1]) {
        case 'features':
            console.log('features [new|load|edit|delete|list] OPTIONS')
            console.log('  Lists all surface features in the current project.')
            break

        case 'collections':
            console.log('collections OPTIONS')
            console.log('  Lists all collections in the current project.')
            break

        case 'help':
            console.log('help')
            console.log('  Displays help information for the specified command.')
            break

        case 'exit':
            console.log('exit')
            console.log('  Exits the program.')
            break

        default:
            topLevelHelp()
            break
    }
}
