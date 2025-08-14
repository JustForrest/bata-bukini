flowchart TD
    subgraph "User Interaction"
        A[User posts comment with '@gemini-cli <request>']
        F{Approve plan?}
    end

    subgraph "Gemini CLI Workflow"
        B[Acknowledge Request]
        C[Checkout Code]
        D[Run Gemini]
        E{Is a plan required?}
        G[Post Plan for Approval]
        H[Execute Request]
        I{Request involves code changes?}
        J[Commit and Push Changes]
        K[Post Final Response]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E -- Yes --> G
    G --> F
    F -- Yes --> H
    F -- No --> K
    E -- No --> H
    H --> I
    I -- Yes --> J
    J --> K
    I -- No --> K
