<template>
  <main class="z-0 relative overflow-hidden bg-gray-100">

    <div v-if="!account_id" class="bg-green-100">
      <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Want to post a message?
            </h2>
            <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div class="mt-2 flex items-center text-sm text-gray-500">
                Log in using NEAR and Ceramic, to post messages!
              </div>
            </div>
          </div>
          <div class="mt-5 flex lg:mt-0 lg:ml-4">
            <span class="sm:ml-3">
              <button @click.prevent="login" type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg class="-ml-1 mr-2 h-5 w-5" width="91px" height="90px" viewBox="0 0 91 90" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path d="M72.24,4.57 L53.42,32.5 C52.7873444,33.336302 52.9080544,34.5192463 53.6965878,35.2105272 C54.4851212,35.9018081 55.6736888,35.866664 56.42,35.13 L74.94,19.13 C75.1582596,18.9298492 75.4748271,18.8790945 75.7447183,19.0009809 C76.0146096,19.1228672 76.1858447,19.3939199 76.18,19.69 L76.18,69.98 C76.1769151,70.2926548 75.980189,70.5705926 75.6863438,70.6774455 C75.3924986,70.7842983 75.0631937,70.6976444 74.86,70.46 L18.86,3.46 C17.0503499,1.28270407 14.3711103,0.0162875344 11.54,-0.000187961334 L9.59,-0.000187961334 C4.29358925,-0.000187961334 -1.42108547e-14,4.29358925 -1.42108547e-14,9.59 L-1.42108547e-14,80.41 C-1.42108547e-14,85.7064108 4.29358925,90 9.59,90 C12.9223673,90 16.0156326,88.2693404 17.76,85.43 L36.58,57.5 C37.2126556,56.663698 37.0919456,55.4807537 36.3034122,54.7894728 C35.5148788,54.0981919 34.3263112,54.133336 33.58,54.87 L15.06,70.87 C14.8417404,71.0701508 14.5251729,71.1209055 14.2552817,70.9990191 C13.9853904,70.8771328 13.8141553,70.6060801 13.82,70.31 L13.82,20.07 C13.8230849,19.7573452 14.019811,19.4794074 14.3136562,19.3725545 C14.6075014,19.2657017 14.9368063,19.3523556 15.14,19.59 L71.14,86.59 C72.9633309,88.7475853 75.6451624,89.9915453 78.47,89.99 L80.47,89.99 C83.0134261,89.99 85.4526802,88.9796279 87.251154,87.181154 C89.0496279,85.3826802 90.06,82.9434261 90.06,80.4 L90.06,9.59 C90.06,7.03614398 89.0414458,4.58775291 87.2299741,2.7875443 C85.4185025,0.987335688 82.963806,-0.0159782446 80.41,-0.000187961334 C77.0776327,-0.000187961334 73.9843674,1.73065956 72.24,4.57 L72.24,4.57 Z" id="Path" fill="#FFFFFF" fill-rule="nonzero"></path>
                    </g>
                </svg>
                Login
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>


    <div v-if="account_id" class="relative mx-auto z-10 max-w-2xl py-10 px-2">

      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="to_account_id" class="block text-sm font-medium text-gray-700">
                Recipient
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <svg class="h-5 w-5 stroke-current text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
                <input v-model="to_account_id" type="text" name="to_account_id" id="to_account_id" class="focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="friend.near">
              </div>
            </div>
          </div>
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Message
            </label>
            <div class="mt-1">
              <textarea v-model="new_message" id="new_message" name="new_message" rows="2" class="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="You are awesome"></textarea>
            </div>
            <p class="mt-2 text-sm text-gray-500">
              Tell someone what you appreciate about them, compliments go a long way!
            </p>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="tip_amount" class="block text-sm font-medium text-gray-700">
                Add A Tip?
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <svg class="h-5 w-5 stroke-current text-gray-800" fill="none" height="38" viewBox="0 0 38 38" width="38" xmlns="http://www.w3.org/2000/svg">
                    <path d="m11.0833 11.0833 1.1196-1.11956c-.4528-.45282-1.1338-.58829-1.7255-.34322-.59164.24507-.9774.82238-.9774 1.46278zm0 15.8334h-1.5833c0 .6404.38576 1.2177.9774 1.4628.5917.2451 1.2727.1096 1.7255-.3433zm15.8334-15.8334h1.5833c0-.6404-.3857-1.21771-.9774-1.46278s-1.2727-.1096-1.7255.34322zm0 15.8334-1.1196 1.1195c.4528.4529 1.1338.5884 1.7255.3433s.9774-.8224.9774-1.4628zm-5.0779-12.9946c-.6183.6183-.6183 1.6208 0 2.2391s1.6208.6183 2.2391 0zm-5.6776 10.1558c.6183-.6183.6183-1.6209 0-2.2391-.6183-.6183-1.6208-.6183-2.2391 0zm-6.6612-12.9946v15.8334h3.1667v-15.8334zm15.8333 0v15.8334h3.1667v-15.8334zm2.7029 14.7138-15.8333-15.83336-2.23916 2.23916 15.83336 15.8333zm-3.9583-9.6359 3.9583-3.9583-2.2391-2.23916-3.9583 3.95836zm-11.875 11.875 3.9583-3.9583-2.2391-2.2391-3.95836 3.9583z" fill="#000000"/><path d="m19 36.4167c9.619 0 17.4167-7.7977 17.4167-17.4167 0-9.61896-7.7977-17.41666-17.4167-17.41666-9.61896 0-17.41666 7.7977-17.41666 17.41666 0 9.619 7.7977 17.4167 17.41666 17.4167z" stroke="#000000" stroke-width="2"/>
                  </svg>
                </span>
                <input v-model="tip_amount" type="text" name="tip_amount" id="tip_amount" class="focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="">
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button @click.prevent="submitMessage" type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Submit
          </button>
        </div>
      </div>

    </div>

    <div class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="lg:text-center">
          <h2 class="text-base text-green-600 font-semibold tracking-wide uppercase">{{ messages.length ? 'All' : 'No' }} Messages</h2>
        </div>

        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">

            <div v-for="msg in messages" :key="msg">
              <div class="shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-white space-y-2 sm:p-6">
                <dt class="flex text-lg leading-6 font-medium text-gray-900">
                  <svg class="mr-1 h-5 w-5 stroke-current text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <span class="text-green-600 text-sm">
                    {{ msg.to }}
                  </span>
                </dt>
                <dd class="mt-2 text-base text-gray-500">
                  {{ msg.body }}
                </dd>
                <div class="flex justify-between">
                  <div class="flex">
                    <span class="py-1 pr-2 text-gray-400 text-xs uppercase">
                      From
                    </span>
                    <svg class="mr-1 h-5 w-5 stroke-current text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <span class="text-gray-400 text-sm">
                      {{ msg.from }}
                    </span>
                  </div>
                  <div v-if="msg.timestamp" class="flex">
                    <span class="text-gray-400 text-sm">
                      {{ getFormattedTs(msg.timestamp) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </dl>
        </div>
      </div>
    </div>


    <div class="bg-gray-200">
      <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-green-800">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <p class="ml-3 font-medium text-green-700 truncate">
              <span class="md:inline">
                Like this demo? The full code is available to hack!
              </span>
            </p>
          </div>
          <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <a href="https://github.com/TrevorJTClarke/near-ceramic-vue" target="_blank" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50">
              View Source
            </a>
          </div>
        </div>
      </div>
    </div>


  </main>
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'

const dummy = [
  {
    to: 'mike.testnet',
    from: 'trevor.testnet',
    body: 'the MAN is helping others constantly and built code examples or links to docs to keep me developing at all hours of the day',
    tip: 1.337,
    timestamp: 1612082129526,
  },
  {
    to: 'mike.testnet',
    from: 'trevor.testnet',
    body: 'Mike wins the over 9000 award for being THE support channel full stop',
    tip: 1.337,
    timestamp: 1612082129526,
  },
  {
    to: 'mike.testnet',
    from: 'trevor.testnet',
    body: 'For being awesome',
    tip: 1.337,
    timestamp: 1612082129526,
  },
]

export default {
  name: 'Home',

  data() {
    return {
      messages: [...dummy],

      to_account_id: '',
      new_message: '',
      tip_amount: '',
    }
  },

  computed: {
    ...mapGetters(['account_id']),
  },

  methods: {
    async login() {
      await this.$near.loginAccount()
    },
    getFormattedTs(ts) {
      return DateTime.fromMillis(ts).toFormat('LLL dd yyyy')
    },

    // This handles the magix! Get all fields, format for sending to chain.
    submitMessage() {
      if (!this.to_account_id || !this.new_message) return
      const payload = {
        to: this.to_account_id,
        body: this.new_message,
        tip: parseInt(this.tip_amount || 0),
        timestamp: +new Date(),
        from: this.account_id,
      }
      console.log('HERE!!!!!!!', payload)

      // Update the UI
      this.messages.unshift(payload)

      // Remove the fields data, so we can do a fresh message
      this.to_account_id = ''
      this.new_message = ''
      this.tip_amount = ''
    },
  },

}
</script>