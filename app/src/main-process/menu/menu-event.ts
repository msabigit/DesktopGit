export type MenuEvent =
  | 'push'
  | 'force-push'
  | 'pull'
  | 'show-changes'
  | 'show-history'
  | 'add-local-repository'
  | 'create-branch'
  | 'show-branches'
  | 'remove-repository'
  | 'create-repository'
  | 'rename-branch'
  | 'delete-branch'
  | 'discard-all-changes'
  | 'stash-all-changes'
  | 'show-preferences'
  | 'choose-repository'
  | 'open-working-directory'
  | 'update-branch-with-contribution-target-branch'
  | 'compare-to-branch'
  | 'merge-branch'
  | 'squash-and-merge-branch'
  | 'rebase-branch'
  | 'show-repository-settings'
  | 'open-in-shell'
  | 'compare-on-github'
  | 'branch-on-github'
  | 'view-repository-on-github'
  | 'clone-repository'
  | 'show-about'
  | 'go-to-commit-message'
  | 'boomtown'
  | 'open-pull-request'
  | 'install-cli'
  | 'open-external-editor'
  | 'select-all'
  | 'show-release-notes-popup'
  | 'show-stashed-changes'
  | 'hide-stashed-changes'
  | 'test-show-notification'
  | 'test-prune-branches'
  | 'find-text'
  | 'create-issue-in-repository-on-github'
  | 'pull-request-check-run-failed'
  | 'start-pull-request'
  | 'show-app-error'
