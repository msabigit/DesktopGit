export class RepoRulesMetadataFailures {
  public failed: string[] = []
  public bypassed: string[] = []
}

/**
 * Metadata restrictions for a specific type of rule, as multiple can
 * be configured at once and all apply to the branch.
 */
export class RepoRulesMetadataRules {
  private rules: IRepoRulesMetadataRule[] = []

  public push(rule?: IRepoRulesMetadataRule): void {
    if (rule === undefined) {
      return
    }

    this.rules.push(rule)
  }

  /**
   * Whether any rules are configured.
   */
  public get hasRules(): boolean {
    return this.rules.length > 0
  }

  /**
   * Gets an object containing arrays of human-readable rules that
   * fail to match the provided input string. If the returned object
   * contains only empty arrays, then all rules pass.
   */
  public getFailedRules(toMatch: string): RepoRulesMetadataFailures {
    const failures = new RepoRulesMetadataFailures()
    for (const rule of this.rules) {
      if (!rule.matcher(toMatch)) {
        if (rule.enforced === 'bypass') {
          failures.bypassed.push(rule.humanDescription)
        } else {
          failures.failed.push(rule.humanDescription)
        }
      }
    }

    return failures
  }
}

/**
 * Parsed repo rule info
 */
export class RepoRulesInfo {
  /**
   * Many rules are not handled in a special way, they
   * instead just display a warning to the user when they're
   * about to commit. They're lumped together into this flag
   * for simplicity. See the `parseRepoRules` function for
   * the full list.
   */
  public basicCommitWarning: RepoRuleEnforced = false

  /**
   * If true, the branch's name conflicts with a rule and
   * cannot be created.
   */
  public creationRestricted: RepoRuleEnforced = false

  public pullRequestRequired: RepoRuleEnforced = false
  public commitMessagePatterns = new RepoRulesMetadataRules()
  public commitAuthorEmailPatterns = new RepoRulesMetadataRules()
  public committerEmailPatterns = new RepoRulesMetadataRules()
  public branchNamePatterns = new RepoRulesMetadataRules()
}

export interface IRepoRulesMetadataRule {
  /**
   * Whether this rule is enforced for the current user.
   */
  enforced: RepoRuleEnforced

  /**
   * Function that determines whether the provided string matches the rule.
   */
  matcher: RepoRulesMetadataMatcher

  /**
   * Human-readable description of the rule. For example, a 'starts_with'
   * rule with the pattern 'abc' that is negated would have a description
   * of 'must not start with "abc"'.
   */
  humanDescription: string
}

export type RepoRulesMetadataMatcher = (toMatch: string) => boolean
export type RepoRuleEnforced = boolean | 'bypass'
