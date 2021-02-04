use borsh::{ BorshDeserialize, BorshSerialize };
use near_sdk::{
    env, near_bindgen, AccountId, PublicKey, Promise,
    collections::{ Vector },
};

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Message {
    pub doc_id: String
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct NearCeramic {
    pub messages: Vector<Message>,
}

impl Default for NearCeramic {
    fn default() -> Self {
        Self {
            messages: Vector::new(b"m".to_vec())
        }
    }
}

#[near_bindgen]
impl NearCeramic {

    #[payable]
    pub fn create_message(
        &mut self,
        to: AccountId,
        doc_id: String
    ) -> Promise {
        assert!(env::is_valid_account_id(to.as_bytes()), "Invalid account id");

        self.messages.push(&Message {
            doc_id,
        });

        // Send tip to other user
        let tip = env::attached_deposit();
        Promise::new(to).transfer(tip)
    }

    pub fn get_count(&self) -> u64 {
        self.messages.len()
    }

    pub fn get_doc_id(&self, index: u64) -> Message {
        self.messages.get(index).unwrap()
    }
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {
    // use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "bob_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "carol_near".to_string(),
            input,
            block_index: 0,
            epoch_height: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
        }
    }

    #[test]
    fn nonexisting_poll() {
        let context = get_context(vec![], false);
        testing_env!(context);
        assert_eq!(true, false);
    }
}
