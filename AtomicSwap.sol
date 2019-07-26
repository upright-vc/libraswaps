pragma solidity ^0.5.1;


contract AtomicSwap {
    struct Swap {
        address sender;
        address recipient;
        uint    startTime;
        uint    duration;
        uint    amount;
        bool    active;
    }
    
    mapping(bytes32=>Swap) swaps;
    
    event SwapStart(address indexed sender,
                    address indexed recipient,
                    bytes32 indexed hashedSecret,
                    uint            startTime,
                    uint            duration,
                    uint            amount);
                    
    function startSwap(address recipient, uint duration, bytes32 hashedSecret) public payable {
        require(! swaps[hashedSecret].active);
        require(msg.value > 0);
        
        Swap memory swap;
        
        swap.sender = msg.sender;
        swap.recipient = recipient;
        swap.startTime = now;
        swap.duration = duration;
        swap.amount = msg.value;
        swap.active = true;
        
        emit SwapStart(swap.sender, swap.recipient, hashedSecret, swap.startTime, swap.duration, swap.amount);
        
        swaps[hashedSecret] = swap;
    }
    
    function cancelSwap(bytes32 hashedSecret) public {
        Swap memory swap = swaps[hashedSecret];
        
        require(swap.sender == msg.sender);
        require(swap.active);
        require(now >= swap.startTime + swap.duration);
        
        swaps[hashedSecret].active = false;
        
        msg.sender.transfer(swap.amount);
        
    }
    
    function completeSwap(bytes memory secret) public {
        bytes32 hashedSecret = keccak256(secret);
        
        Swap memory swap = swaps[hashedSecret];
        
        require(swap.recipient == msg.sender);
        require(swap.active);
        require(now < swap.startTime + swap.duration);
        
        swaps[hashedSecret].active = false;
        
        msg.sender.transfer(swap.amount);
    }
    
    // auxilary function to get swap info
    function getSwapInfo(bytes32 hashedSecret) public view
        returns(address sender,
                address recipient,
                uint    startTime,
                uint    duration,
                uint    amount,
                bool    active) {
    
        Swap memory swap = swaps[hashedSecret];
    
        sender = swap.sender;
        recipient = swap.recipient;
        startTime = swap.startTime;
        duration = swap.duration;
        amount = swap.amount;
        active = swap.active;
    }

    
    // auxilary function to help calculate the hashed secret on chain
    function hashSecret(bytes memory secret) public pure returns(bytes32){
        return keccak256(secret);
    }
}
